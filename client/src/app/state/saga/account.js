import { all, call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Account from 'models/account'
import { actions, selectors, types } from 'state/interface'

import { addToast } from './toast'

const changePasswordLoop = function*() {
  while (true) {
    const { payload: { currentPassword, newPassword } } = yield take(types[ 'ACCOUNT/CHANGE_PASSWORD' ])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const result = yield call(Account.changePassword, currentPassword, newPassword, session.token)

      if (!result) {
        throw new Error('Change password failed')
      }

      yield all([
        put(actions.changePasswordCompleted()),
        fork(addToast, {
          type: 'success',
          message: 'Password changed.'
        })
      ])
    } catch (e) {
      yield put(actions.changePasswordFailed(serializeError(e)))
    }
  }
}

const getLoop = function*() {
  while (true) {
    try {
      const {
        payload: { identifier }
      } = yield take(types.account.GET)

      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const account = yield Account.get(identifier, session.token)

      if (!account) {
        throw 'Account not found'
      }

      yield put(actions.getAccountCompleted(account))
    } catch (e) {
      yield put(actions.getAccountFailed(serializeError(e)))
    }
  }
}

const registerLoop = function*() {
  while (true) {
    try {
      const {
        payload: { email }
      } = yield take(types.account.REGISTER)

      const account = yield Account.register(email)

      yield put(actions.registerCompleted(account))
    } catch (e) {
      yield put(actions.registerFailed(serializeError(e)))
    }
  }
}

const updateProfileLoop = function*() {
  while (true) {
    const action = yield take(types[ 'ACCOUNT/UPDATE' ])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const updatedAccount = yield call(Account.update, session.token, action.payload.account)

      yield put(actions.updateProfileCompleted(updatedAccount))
    } catch (e) {
      yield put(actions.updateProfileFailed(serializeError(e)))
      continue
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(changePasswordLoop)
  yield fork(getLoop)
  yield fork(registerLoop)
  yield fork(updateProfileLoop)
}
