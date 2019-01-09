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
            metricNames,
            projectIdentifier,
            startDate
          }
        }
      } = yield take(types.reports.GENERATE_USAGE_REPORT)
      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }
      // Convert period to minute:
      // daily <--> 1440 minute hourly <--> 60minute
      const convetedPeriod = granularity === 'daily' ? 1440 : 60

      const data = yield Metric.generateUsageReport({
        metricNames,
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

      const result = {}

      metricNames.map((name) => {
        const response = data[ name ]

        result[ name ] = {
          synthesizedData: syntheticDataService.synthesizeData(response.datapoints),
          ...response
        }
      })

      yield put(
        actions.generateUsageReportCompleted(
          result,
          granularity
        )
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
