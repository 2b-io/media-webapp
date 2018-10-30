import dateFormat from 'dateformat'
import delay from 'delay'
import { fork, put, select, take } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import { actions, types, selectors } from 'state/interface'

const convertDate = (date, granularity = 'daily') => granularity === 'daily' ?
  dateFormat(date, 'mmm, dd, yyyy') :
  dateFormat(date, 'mmm, dd, yyyy, HH:MM')

const analysisData = (requests) => {
  const values = requests.map((item) => item.value)
  const minimum = Math.min(...values)
  const maximum = Math.max(...values)
  const total = values.reduce((a, b) => a + b)
  const average = total / values.length

  return {
    average,
    total,
    maximum,
    minimum
  }
}

const DATA = {
  bytesDownloaded: [
    {
      timestamp: convertDate(1540069140000),
      value: 53930,
    },
    {
      timestamp: convertDate(1540155540000),
      value: 23930,
    },
    {
      timestamp: convertDate(1540241940000),
      value: 43930,
    },
    {
      timestamp: convertDate(1540328340000),
      value: 19230,
    },
    {
      timestamp: convertDate(1540414740000),
      value: 66310,
    }
  ],
  requests: [
    {
      timestamp: convertDate(1540069140000),
      value: 53930,
    },
    {
      timestamp: convertDate(1540155540000),
      value: 23930,
    },
    {
      timestamp: convertDate(1540241940000),
      value: 43930,
    },
    {
      timestamp: convertDate(1540328340000),
      value: 19230,
    },
    {
      timestamp: convertDate(1540414740000),
      value: 66310,
    }
  ]
}

const generateReportLoop = function*() {
  while (true) {
    try {
      const { payload } = yield take(types.usageReport.GENERATE_REPORT)
      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      yield delay(1e3)
      const data = DATA
      //const data = yield Metric

      if (!data) {
        throw 'Generate report failed'
      }

      const {
        bytesDownloaded,
        requests
      } = data

      const totalBytes = bytesDownloaded.map((item) => item.value).reduce((a, b) => a + b)
      const requestData = analysisData(requests)

      yield put(
        actions.generateReportCompleted(data, payload.data.granularity, requestData, { totalBytes })
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
