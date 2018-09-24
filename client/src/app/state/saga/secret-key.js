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

      const { identifier } = action.payload
      const secretKey = yield SecretKey.getSecretKey(session.token, identifier)
      yield put(actions.getSecretKeyCompleted({ identifier, secretKey }))
    } catch (e) {
      yield put(actions.getSecretKeyFailed(serializeError(e)))
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

      const updatedSecretKey = yield SecretKey.updateSecretKey(session.token, identifier, secretKey)

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


export default function*() {
  yield take('@@INITIALIZED')
  yield fork(getLoop)
  yield fork(updateLoop)
}
