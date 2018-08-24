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
    const { payload: { id } } = yield take(types[ 'ACCOUNT/GET' ])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const account = yield call(Account.get, id === 'me' ? null : id, session.token)

      yield put(actions.getAccountCompleted(account))
    } catch (e) {
      yield put(actions.getAccountFailed(serializeError(e)))
    }
  }
}

const registerLoop = function*() {
  while (true) {
    const { payload: { email } } = yield take(types[ 'ACCOUNT/REGISTER' ])

    try {
      const account = yield call(Account.register, email)

      yield put(actions.registerCompleted(account))
    } catch (e) {
      yield put(actions.registerFailed(serializeError(e)))
    }
  }
}
const searchAccountLoop = function*() {
  while (true) {

    const action = yield take(types['ACCOUNT/SEARCH_ACCOUNT'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const accounts = yield call(Account.search, session.token, action.payload.email)

      if (!accounts.length) {
        yield put(actions.searchAccountNoResult(action.payload.email))
        continue
      }

      yield put(actions.searchAccountCompleted({ accounts }))

    } catch (e) {
      yield put(actions.searchAccountFailed(serializeError(e)))
      continue
    }
  }
}


export default function*() {
  yield take('@@INITIALIZED')
  yield fork(changePasswordLoop)
  yield fork(getLoop)
  yield fork(registerLoop)
  yield fork(searchAccountLoop)
}
