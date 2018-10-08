import { take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import SecretKey from 'models/secret-key'
import { actions, types, selectors } from 'state/interface'

const getLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier,
          key
        }
      } = yield take(types.secretKey.GET)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const secretKey = yield SecretKey.get(session.token, identifier, key)

      yield put(
        actions.getSecretKeyCompleted({
          identifier,
          secretKey
        })
      )
    } catch (e) {
      yield put(
        actions.getSecretKeyFailed(serializeError(e))
      )
    }
  }
}

const fetchLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier
        }
      } = yield take(types.secretKey.FETCH)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const secretKeys = yield SecretKey.fetch(session.token, identifier)
      yield put(
        actions.fetchSecretKeysCompleted({
          identifier,
          secretKeys
        })
      )
    } catch (e) {
      yield put(
        actions.fetchSecretKeysFailed(serializeError(e))
      )
    }
  }
}

const createLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier
        }
      } = yield take(types.secretKey.CREATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const secretKey = yield SecretKey.create(session.token, identifier)

      yield put(
        actions.createSecretKeyCompleted({
          identifier,
          secretKey
        })
      )
    } catch (e) {
      yield put(
        actions.createSecretKeyFailed(serializeError(e))
      )
    }
  }
}

const updateLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier,
          secretKey
        }
      } = yield take(types.secretKey.UPDATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const updatedSecretKey = yield SecretKey.update(session.token, identifier, secretKey)

      yield put(
        actions.updateSecretKeyCompleted({
          identifier,
          secretKey: updatedSecretKey
        })
      )
    } catch (e) {
      yield put(
        actions.updateSecretKeyFailed(serializeError(e))
      )
    }
  }
}

const removeLoop = function*() {
  while (true) {
    const action = yield take(types.secretKey.REMOVE)

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier, key } = action.payload

      const removedSecretKey = yield SecretKey.remove(session.token, identifier, key)

      if (!removedSecretKey) {
        throw new Error('Cannot delete secret key')
      }

      yield put(
        actions.removeSecretKeyCompleted({
          identifier,
          key
        })
      )
    } catch (e) {
      yield put(
        actions.removeSecretKeyFailed(serializeError(e))
      )
    }
  }
}


export default function*() {
  yield take('@@INITIALIZED')
  yield fork(createLoop)
  yield fork(removeLoop)
  yield fork(getLoop)
  yield fork(fetchLoop)
  yield fork(updateLoop)
}
