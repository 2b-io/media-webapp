import { take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import { actions, types, selectors } from 'state/interface'

import Invalidation from 'models/invalidation'

const listInvalidateCacheLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          projectIdentifier
        }
      } = yield take(types.invalidation.LIST_INVALIDATE_CACHE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const listInvalidateCaches = yield Invalidation.list({
        projectIdentifier
      }, {
        token: session.token
      })

      if (!listInvalidateCaches) {
        throw 'Get pin projects failed'
      }

      yield put(
        actions.listInvalidateCacheCompleted(
          listInvalidateCaches
        )
      )
    } catch (e) {
      yield put(
        actions.listInvalidateCache(serializeError(e))
      )
    }
  }
}

const invalidateCacheLoop = function*() {
  while(true) {
    try {
      const {
        payload: {
          projectIdentifier,
          patterns
        }
      } = yield take(types.invalidation.INVALIDATE_CACHE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const { identifier, status } = yield Invalidation.invalidateCache({
        projectIdentifier,
        patterns
      }, {
        token: session.token
      })

      if (!identifier) {
        throw 'Invalidate cache failed'
      }

      yield put(
        actions.invalidateCacheCompleted(identifier, status, patterns)
      )
    } catch (e) {
      yield put(
        actions.invalidateCacheFailed(serializeError(e))
      )
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(listInvalidateCacheLoop)
  yield fork(invalidateCacheLoop)
}
