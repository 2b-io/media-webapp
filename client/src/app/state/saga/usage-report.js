import ms from 'ms'
import { fork, put, select, take } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import dateTimeService from 'services/date-time'
import { actions, types, selectors } from 'state/interface'

import Metric from 'models/metric'

const synthesizeRequestData = (datapoints) => {
  if (!datapoints.length) {
    return {
      average: 0,
      total: 0,
      maximum: 0,
      minimum: 0
    }
  }

  const values = datapoints.map((item) => item.value)
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

const synthesizeBytesDownloadData = (datapoints) => {
  if (!datapoints.length) {
    return { totalBytes: 0 }
  }

  const totalBytes = datapoints.map((item) => item.value).reduce((total, value) => total + value)

  return { totalBytes }
}

const generateUsageReportLoop = function*() {
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
      } = yield take(types.reports.GENERATE_USAGE_REPORT)
      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const data = yield Metric.generateUsageReport({
        projectIdentifier,
        period: granularity === 'daily' ? ms('1d') / 1000 : ms('1h') / 1000, //86400s : 3600s
        startTime: dateTimeService.getStartOfUTCDay(new Date(startDate)),
        endTime: dateTimeService.getEndOfUTCDay(new Date(endDate))
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

      const bytesDownloadData = synthesizeBytesDownloadData(bytesDownloaded.datapoints)
      const requestData = synthesizeRequestData(requests.datapoints)

      yield put(
        actions.generateUsageReportCompleted(data, granularity, requestData, bytesDownloadData)
      )
    } catch (e) {
      yield put(
        actions.generateUsageReportFailed(serializeError(e))
      )
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(generateUsageReportLoop)
}
