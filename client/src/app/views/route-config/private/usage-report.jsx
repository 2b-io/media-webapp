import { all, fork, put, take, race, select } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types, selectors } from 'state/interface'
import * as UsageReport from 'views/pages/usage-report'

const watchGetProject = function*() {
  const { identifier } = yield select(selectors.currentParams)

  const { completed, failed } = yield race({
    completed: take(types.project.GET_COMPLETED),
    failed: take(types.project.GET_FAILED)
  })

  if (failed) {
    yield all([
      fork(addToast, {
        type: 'error',
        message: 'Cannot connect to project. Project does not exist or network has error(s).'
      }),
      put(
        actions.requestLocation('/projects')
      )
    ])
  }

  if (completed) {
    const { isActive, status } = completed.payload.project

    if (!(isActive === true && status === 'DEPLOYED')) {
      yield all([
        fork(addToast, {
          type: 'error',
          message: 'Project is initializing or disabled.'
        }),
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        )
      ])
    }
  }
}

export default {
  '/projects/:identifier/usage-report': {
    component: UsageReport,
    exact: true,
    *state(path) {
      yield fork(watchGetProject)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
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
