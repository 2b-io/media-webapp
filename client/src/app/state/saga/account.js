import { call, take, fork, put } from 'redux-saga/effects'
import Account from 'models/account'
import { actions, types } from 'state/interface'

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
  yield fork(registerLoop)
}
