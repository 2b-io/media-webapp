import { take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import SecretKey from 'models/secret-key'
import { actions, types, selectors } from 'state/interface'

const getLoop = function*() {
  while (true) {
    const action = yield take(types['SECRETKEY/GET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier, key } = action.payload
      const secretKey = yield SecretKey.get(session.token, identifier, key)
      yield put(actions.getSecretKeyCompleted({ identifier, secretKey }))
    } catch (e) {
      yield put(actions.getSecretKeyFailed(serializeError(e)))
      continue
    }
  }
}

const fetchLoop = function*() {
  while (true) {
    const action = yield take(types['SECRETKEY/FETCH'])
    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier } = action.payload
      const secretKeys = yield SecretKey.fetch(session.token, identifier)
      yield put(actions.fetchSecretKeysCompleted({ identifier, secretKeys }))
    } catch (e) {
      yield put(actions.fetchSecretKeysFailed(serializeError(e)))
      continue
    }
  }
}

const createLoop = function*() {
  while (true) {
    const action = yield take(types['SECRETKEY/CREATE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier } = action.payload
      const secretKey = yield SecretKey.create(session.token, identifier)
      yield put(actions.createSecretKeyCompleted({ identifier, secretKey }))
    } catch (e) {
      yield put(actions.createSecretKeyFailed(serializeError(e)))
      continue
    }
  }
}

const updateLoop = function*() {
  while (true) {
    const action = yield take(types['SECRETKEY/UPDATE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier, secretKey } = action.payload

      const updatedSecretKey = yield SecretKey.update(session.token, identifier, secretKey)

      yield put(actions.updateSecretKeyCompleted({
        identifier,
        secretKey: updatedSecretKey
      }))
    } catch (e) {
      yield put(actions.updateSecretKeyFailed(serializeError(e)))
      continue
    }
  }
}

const removeLoop = function*() {
  while (true) {
    const action = yield take(types['SECRETKEY/REMOVE'])

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
      yield put(actions.removeSecretKeyCompleted({
        identifier,
        key
      }))
    } catch (e) {
      yield put(actions.removeSecretKeyFailed(serializeError(e)))
      continue
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
