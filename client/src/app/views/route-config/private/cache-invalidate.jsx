import { all, fork, put, take, race, select } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types, selectors } from 'state/interface'
import * as CacheInvalidate from 'views/pages/cache-invalidate'

const watchGetListInvalidate = function*(path) {
  const { identifier } = yield select(selectors.currentParams)

  const { completed, failed } = yield race({
    completed: take(types.invalidation.LIST_INVALIDATE_CACHE_COMPLETED),
    failed: take(types.invalidation.LIST_INVALIDATE_CACHE_FAILED),
  })

  if (failed) {
    yield all([
      fork(addToast, {
        type: 'error',
        message: 'Cannot connect to invalidation cache'
      }),
      put(
        actions.requestLocation(`/projects/${ identifier }`)
      )
    ])
  }
  yield put(
    actions.mergeUIState(path, {
      idle: true
    })
  )
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
        expiring: '5s',
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

const watchCopyPatternsInvalidateCache = function*(path) {
  while (true) {
    const listPatterns = yield take(types.invalidation.COPY_PATTERN_INVALIDATE_CACHE)
    const { patterns } = listPatterns.payload
    yield put(
      actions.mergeUIState(path, {
        patterns
      })
    )
  }
}

export default {
  '/projects/:identifier/cache-invalidator': {
    component: CacheInvalidate,
    exact: true,
    *state(path) {
      yield fork(watchCacheInvalidator, path)
      yield fork(watchCopyPatternsInvalidateCache, path)
      yield fork(watchGetListInvalidate, path)

      const { identifier } = yield select(selectors.currentParams)
      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.listInvalidateCache(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            idle: false
          })
        )
      ])
    }
  }
}
