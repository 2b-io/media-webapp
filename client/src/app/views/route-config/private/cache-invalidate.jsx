import { all, fork, put, take, race, select } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types, selectors } from 'state/interface'
import * as CacheInvalidate from 'views/pages/cache-invalidate'

const watchGetProject = function*() {
  while (true) {
    yield take(types.project.GET_FAILED)

    yield all([
      put(
        actions.requestLocation('/projects')
      ),
      fork(addToast, {
        type: 'error',
        message: 'Project does not exist or internet connection error.'
      })
    ])
  }
}

const watchCacheInvalidator = function*(path) {
  while (true) {
    yield take(types.project.INVALIDATE_CACHE)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { completed, failed } = yield race({
      completed: take(types.project.INVALIDATE_CACHE_COMPLETED),
      failed: take(types.project.INVALIDATE_CACHE_FAILED)
    })

    yield put(
      actions.replaceUIState(path, {
        idle: true
      })
    )

    if (completed) {
      yield fork(addToast, {
        type: 'success',
        message: 'Cache invalidate completed. Please wait a minute to finish your change.'
      })
    }

    if (failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Cache invalidate failed. Please check your network connection and try again.'
      })
    }
  }
}

export default {
  '/projects/:identifier/cache-invalidator': {
    component: CacheInvalidate,
    exact: true,
    *state(path) {
      yield fork(watchGetProject)
      yield fork(watchCacheInvalidator, path)

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
