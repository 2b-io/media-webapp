import { all, fork, put, take, race, select } from 'redux-saga/effects'

import { actions, types, selectors } from 'state/interface'
import * as CacheInvalidate from 'views/pages/cache-invalidate'

const watchCacheInvalidator = function*(path) {
  while (true) {
    yield take(types[ 'PROJECT/INVALIDATE_CACHE' ])

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const results = yield race({
      completed: take(types[ 'PROJECT/INVALIDATE_CACHE_COMPLETED' ]),
      failed: take(types[ 'PROJECT/INVALIDATE_CACHE_FAILED' ])
    })

    yield put(
      actions.replaceUIState(path, {
        idle: true,
        error: results.failed || null,
        result: results.completed || null
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
