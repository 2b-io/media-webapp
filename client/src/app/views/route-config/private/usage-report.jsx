import { all, fork, put, race, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types } from 'state/interface'
import * as UsageReport from 'views/pages/usage-report'

const watchFetchProjects = function*() {
  yield take(types.project.FETCH_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Cannot fetch project. Project does not exist or network has error(s).'
  })
}

const watchGenerateReport = function*(path) {
  while (true) {
    yield take(types.usageReport.GENERATE_REPORT)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { completed, failed } = yield race({
      completed: take(types.usageReport.GENERATE_REPORT_COMPLETED),
      failed: take(types.usageReport.GENERATE_REPORT_FAILED)
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
      yield put(
        actions.mergeUIState(path, {
          data: completed.payload.data,
          period: completed.payload.period
        })
      )
    }
  }
}

export default {
  '/reports/usage-report': {
    component: UsageReport,
    exact: true,
    *state(path) {
      yield fork(watchFetchProjects)
      yield fork(watchGenerateReport, path)

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
