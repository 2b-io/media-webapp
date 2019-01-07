import { fork, put, select, take } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import dateTimeService from 'services/date-time'
import syntheticDataService from 'services/synthetic-data'
import { actions, types, selectors } from 'state/interface'

import CdnReport from 'models/cdn-report'

const generateCdnReportLoop = function*() {
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
      } = yield take(types.reports.GENERATE_CDN_REPORT)
      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }
      // Convert period to minute:
      // daily <--> 1440 minute. hourly <--> 60minute
      const convetedPeriod = granularity === 'daily' ? 1440 : 60

      const data = yield CdnReport.generateCdnReport({
        projectIdentifier,
        period: convetedPeriod,
        startTime: dateTimeService.getStartOfUTCDay(new Date(startDate)),
        endTime: dateTimeService.getEndOfUTCDay(new Date(endDate))
      }, {
        token: session.token
      })

      if (!data) {
        throw 'Generate report failed'
      }

      const {
        timeConsumed,
        requests
      } = data

      const timeConsumedData = syntheticDataService.synthesizeTimeConsumedData(timeConsumed.datapoints)
      const requestData = syntheticDataService.synthesizeRequestData(requests.datapoints)

      yield put(
        actions.generateCdnReportCompleted(data, granularity, requestData, timeConsumedData)
      )
    } catch (e) {
      yield put(
        actions.generateCdnReportFailed(serializeError(e))
      )
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(generateCdnReportLoop)
}
