import dateFormat from 'dateformat'
import delay from 'delay'
import { fork, put, select, take } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import { actions, types, selectors } from 'state/interface'

const convertDate = (date, granularity = 'daily') => granularity === 'daily' ?
  dateFormat(date, 'mmm, dd, yyyy') :
  dateFormat(date, 'mmm, dd, yyyy, HH:MM')

const DATA = {
  name: 'Bytes Downloaded',
  projectIdentifier: 'sksss-kwrjklw-ss',
  startTime: 0,
  endTime: 0,
  period: 3600,
  datapoints: [
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
      yield take(types.usageReport.GENERATE_REPORT)
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

      yield put(
        actions.generateReportCompleted(data)
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
