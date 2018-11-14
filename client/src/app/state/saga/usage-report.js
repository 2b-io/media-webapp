import ms from 'ms'
import { fork, put, select, take } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import dateTimeService from 'services/date-time'
import syntheticDataService from 'services/synthetic-data'
import { actions, types, selectors } from 'state/interface'

import Metric from 'models/metric'

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

      const todayUTC = dateTimeService.getToDayOfUTCDay()
      //if end date is today then set end time equal utc time now
      const endTime = endDate === todayUTC ?
        dateTimeService.getNowOfUTCDay() :
        dateTimeService.getEndOfUTCDay(new Date(endDate))

      const data = yield Metric.generateUsageReport({
        projectIdentifier,
        period: granularity === 'daily' ? ms('1d') / 1000 : ms('1h') / 1000, //86400s : 3600s
        startTime: dateTimeService.getStartOfUTCDay(new Date(startDate)),
        endTime
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

      const bytesDownloadData = syntheticDataService.synthesizeBytesDownloadData(bytesDownloaded.datapoints)
      const requestData = syntheticDataService.synthesizeRequestData(requests.datapoints)

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
