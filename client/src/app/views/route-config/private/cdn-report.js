import { all, fork, put, race, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types } from 'state/interface'
import * as CdnReport from 'views/pages/cdn-report'

const watchFetchProjects = function*() {
  yield take(types.project.FETCH_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Cannot fetch project. Project does not exist or network has error(s).'
  })
}

const watchGenerateCdnReport = function*(path) {
  while (true) {
    yield take(types.reports.GENERATE_CDN_REPORT)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { completed, failed } = yield race({
      completed: take(types.reports.GENERATE_CDN_REPORT_COMPLETED),
      failed: take(types.reports.GENERATE_CDN_REPORT_FAILED)
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
        period,
        requestData,
        timeConsumedData
      } = completed.payload

      yield put(
        actions.mergeUIState(path, {
          data,
          period,
          requestData,
          timeConsumedData
        })
      )
    }
  }
}

export default {
  '/reports/cdn': {
    component: CdnReport,
    exact: true,
    *state(path) {
      yield fork(watchFetchProjects)
      yield fork(watchGenerateCdnReport, path)

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
