import { all, fork, put, take } from 'redux-saga/effects'

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

export default {
  '/reports/usage-report': {
    component: UsageReport,
    exact: true,
    *state(path) {
      yield fork(watchFetchProjects)

      yield all([
        put(
          actions.fetchProjects()
        ),
        put(
          actions.initializeUIState(path, {
            idle: true
          })
        )
      ])
    }
  }
}
