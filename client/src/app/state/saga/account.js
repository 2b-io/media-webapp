import { call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Account from 'models/account'
import { actions, selectors, types } from 'state/interface'

const changePasswordLoop = function*() {
  while (true) {
    const { payload: { currentPassword, newPassword } } = yield take(types['ACCOUNT/CHANGE_PASSWORD'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const result = yield call(Account.changePassword, currentPassword, newPassword, session.token)

      if (!result) {
        throw new Error('Change password failed')
      }

      yield put(actions.changePasswordCompleted())
    } catch (e) {
      yield put(actions.changePasswordFailed(serializeError(e)))
    }
  }
}

const registerLoop = function*() {
  while (true) {
    const { payload: { email } } = yield take(types['ACCOUNT/REGISTER'])

    try {
      const account = yield call(Account.register, email)

      yield put(actions.registerCompleted(account))
    } catch (e) {
      yield put(actions.registerFailed(e))

      continue
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(changePasswordLoop)
  yield fork(registerLoop)
}
