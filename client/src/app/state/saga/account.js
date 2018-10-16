import { take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Account from 'models/account'
import { actions, selectors, types } from 'state/interface'

const changePasswordLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          currentPassword,
          newPassword
        }
      } = yield take(types.account.CHANGE_PASSWORD)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const result = yield Account.changePassword({
        currentPassword,
        newPassword
      }, {
        token: session.token
      })

      if (!result) {
        throw 'Change password failed'
      }

      yield  put(
        actions.changePasswordCompleted()
      )
    } catch (e) {
      yield put(
        actions.changePasswordFailed(serializeError(e))
      )
    }
  }
}

const getLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier
        }
      } = yield take(types.account.GET)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const account = yield Account.get({
        identifier
      }, {
        token: session.token
      })

      if (!account) {
        throw 'Account not found'
      }

      yield put(
        actions.getAccountCompleted(account)
      )
    } catch (e) {
      yield put(
        actions.getAccountFailed(serializeError(e))
      )
    }
  }
}

const registerLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          email
        }
      } = yield take(types.account.REGISTER)

      const account = yield Account.register({
        email
      })

      if (!account) {
        throw 'Register failed'
      }

      yield put(
        actions.registerCompleted(account)
      )
    } catch (e) {
      yield put(
        actions.registerFailed(serializeError(e))
      )
    }
  }
}

const updateProfileLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          account
        }
      } = yield take(types.account.UPDATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const updatedAccount = yield Account.update({
        account
      }, {
        token: session.token
      })

      if (!updatedAccount) {
        throw 'Account can not update'
      }

      yield put(
        actions.updateProfileCompleted(updatedAccount)
      )
    } catch (e) {
      yield put(
        actions.updateProfileFailed(serializeError(e))
      )
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
