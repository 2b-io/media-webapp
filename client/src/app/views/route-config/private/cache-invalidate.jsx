import { all, fork, put, take, race, select } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types, selectors } from 'state/interface'
import * as CacheInvalidate from 'views/pages/cache-invalidate'

const watchGetProject = function*(path) {
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
        message: 'Cache invalidation failed. Please check your network connection and try again.'
      })
    }
  }
}

export default {
  '/projects/:identifier/cache-invalidator': {
    component: CacheInvalidate,
    exact: true,
    *state(path) {
      yield fork(watchGetProject, path)
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
