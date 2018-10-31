import { fork, put, select, take } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import { actions, types, selectors } from 'state/interface'

import Metric from 'models/metric'

// const convertDate = (date, granularity = 'daily') => granularity === 'daily' ?
//   dateFormat(date, 'mmm, dd, yyyy') :
//   dateFormat(date, 'mmm, dd, yyyy, HH:MM')

const analysisData = (requests) => {
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
        period: granularity === 'daily' ? 86400 : 3600,
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

      const totalBytes = bytesDownloaded.datapoints.map((item) => item.value).reduce((a, b) => a + b)
      const requestData = analysisData(requests.datapoints)

      yield put(
        actions.generateReportCompleted(data, granularity, requestData, { totalBytes })
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
