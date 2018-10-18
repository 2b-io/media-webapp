import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as CacheSetting from 'views/pages/cache-setting'

const watchGetProject = function*() {
  yield take(types.project.GET_FAILED)

  yield all([
    fork(addToast, {
      type: 'error',
      message: 'Project does not exist or internet connection error.'
    }),
    put(
      actions.requestLocation('/projects')
    )
  ])
}

const watchGetCacheSetting = function*() {
  yield take(types.cacheSetting.GET_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Get cache setting failed.'
  })
}

export default {
  '/projects/:identifier/cache-setting': {
    component: CacheSetting,
    exact: true,
    *state(path) {
      yield fork(watchGetProject)
      yield fork(watchGetCacheSetting)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.getCacheSetting(identifier)
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
