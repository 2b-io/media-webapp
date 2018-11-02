import ms from 'ms'
import { fork, put, select, take } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import { actions, types, selectors } from 'state/interface'

import Metric from 'models/metric'

const synthesizeData = (requests) => {
  if (!requests.length) {
    return {
      average: 0,
      total: 0,
      maximum: 0,
      minimum: 0
    }
  }

  const values = requests.map((item) => item.value)
  const minimum = Math.min(...values)
  const maximum = Math.max(...values)
  const total = values.reduce((a, b) => a + b)
  const average = Math.trunc(total / values.length)

  return {
    average,
    total,
    maximum,
    minimum
  }
}

const generateReportLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          data: {
            endDate,
            granularity,
            projectIdentifier,
            startDate
          }
        }
      } = yield take(types.usageReport.GENERATE_REPORT)
      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const data = yield Metric.generateUsageReport({
        endTime: Date.parse(endDate),
        period: granularity === 'daily' ? ms('1d') / 1000 : ms('1h') / 1000, //86400s : 3600s
        projectIdentifier,
        startTime: Date.parse(startDate)
      }, {
        token: session.token
      })

      if (!data) {
        throw 'Generate report failed'
      }

      const {
        bytesDownloaded,
        requests
      } = data

      const bytesDownloadData = {}

      if (!bytesDownloaded.datapoints.length) {
        bytesDownloadData.totalBytes = 0
      } else {
        bytesDownloadData.totalBytes = bytesDownloaded.datapoints.map((item) => item.value).reduce((a, b) => a + b)
      }

      const requestData = synthesizeData(requests.datapoints)

      yield put(
        actions.generateReportCompleted(data, granularity, requestData, bytesDownloadData)
      )
    } catch (e) {
      yield put(
        actions.generateReportFailed(serializeError(e))
      )
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(generateReportLoop)
}
