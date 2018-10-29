import dateFormat from 'dateformat'
import delay from 'delay'
import { fork, put, select, take } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import { actions, types, selectors } from 'state/interface'

const convertDate = (date, granularity = 'daily') => granularity === 'daily' ?
  dateFormat(date, 'mmm, dd, yyyy') :
  dateFormat(date, 'mmm, dd, yyyy, HH:MM')

const FAKE_DATA = [
  {
    date: convertDate('2018-10-20T20:59:00.000Z'),
    bandwidth: 53930,
    Unit: 'None'
  },
  {
    date: convertDate('2018-10-21T20:59:00.000Z'),
    bandwidth: 23930,
    Unit: 'None'
  },
  {
    date: convertDate('2018-10-22T20:59:00.000Z'),
    bandwidth: 43930,
    Unit: 'None'
  },
  {
    date: convertDate('2018-10-23T20:59:00.000Z'),
    bandwidth: 19230,
    Unit: 'None'
  },
  {
    date: convertDate('2018-10-24T20:59:00.000Z'),
    bandwidth: 66310,
    Unit: 'None'
  },
]

const generateReportLoop = function*() {
  while (true) {
    try {
      yield take(types.usageReport.GENERATE_REPORT)
      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      yield delay(1e3)
      const data = FAKE_DATA

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
