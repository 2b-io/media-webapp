import { call, fork, put, take } from 'redux-saga/effects'

import { ACCOUNT } from 'actions/account'
import Account from 'models/account'

export function* createAccount() {
  while (true) {
    const action = yield take(ACCOUNT.CREATE_REQUEST)

    try {
      const account = yield call(Account.create, {
        account: action.payload
      })

      yield put({
        type: ACCOUNT.CREATE_SUCCESS,
        payload: account
      })
    } catch (error) {
      yield put({
        type: ACCOUNT.CREATE_FAILURE,
        error
      })
    }
  }
}

export default function* root() {
  yield fork(createAccount)
}
