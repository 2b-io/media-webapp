import { take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import SecretKey from 'models/secret-key'
import { actions, types, selectors } from 'state/interface'

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

      const secretKeys = yield SecretKey.fetch({
        identifier
      }, {
        token: session.token
      })

      if (!secretKeys) {
        throw 'SecretKeys not found'
      }

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

      const secretKey = yield SecretKey.create({
        identifier
      }, {
        token: session.token
      })

      if (!secretKey) {
        throw 'Create secret key failed.'
      }

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
          secretKey: { key, isActive }
        }
      } = yield take(types.secretKey.UPDATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const updatedSecretKey = yield SecretKey.update({
        identifier,
        secretKey: { key, isActive }
      }, {
        token: session.token
      })

      if (!updatedSecretKey) {
        throw 'Update secret key failed.'
      }

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
    try {
      const {
        payload: {
          identifier,
          key
        }
      } = yield take(types.secretKey.REMOVE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const removedSecretKey = yield SecretKey.remove({
        identifier,
        key
      }, {
        token: session.token
      })

      if (!removedSecretKey) {
        throw 'Remove secret key failed'
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
  yield fork(fetchLoop)
  yield fork(updateLoop)
}
