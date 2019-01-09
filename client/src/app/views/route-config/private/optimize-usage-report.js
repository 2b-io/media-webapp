import { all, fork, put, race, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types } from 'state/interface'
import * as OptimizeUsageReport from 'views/pages/optimize-usage-report'

const watchFetchProjects = function*() {
  yield take(types.project.FETCH_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Cannot fetch project. Project does not exist or network has error(s).'
  })
}

const watchGenerateOptimizeUsageReport = function*(path) {
  while (true) {
    yield take(types.reports.GENERATE_USAGE_REPORT)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { completed, failed } = yield race({
      completed: take(types.reports.GENERATE_USAGE_REPORT_COMPLETED),
      failed: take(types.reports.GENERATE_USAGE_REPORT_FAILED)
    })

    yield put(
      actions.mergeUIState(path, {
        idle: true
      })
    )

    if (failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Cannot generate report. Please check your internet connection and try again.'
      })
    }

    if (completed) {
      const {
        data,
        period
      } = completed.payload

      yield put(
        actions.mergeUIState(path, {
          data,
          period
        })
      )
    }
  }
}

export default {
  '/reports/optimization': {
    component: OptimizeUsageReport,
    exact: true,
    *state(path) {
      yield fork(watchFetchProjects)
      yield fork(watchGenerateOptimizeUsageReport, path)

      yield all([
        put(
          actions.fetchProjects()
        ),
        put(
          actions.initializeUIState(path, {
            data: null,
            idle: true
          })
        )
      ])
    }
  }
}
