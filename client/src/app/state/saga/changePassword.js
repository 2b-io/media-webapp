import { call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Account from 'models/account'
import { actions, types, selectors } from 'state/interface'


const changePasswordLoop = function*() {
  while (true) {

    const action = yield take(types['PROFILE/FETCH_PASSWORD'])
    try {
      let { currentPassword, newPassword } = action.payload
      const session = yield select(selectors.currentSession)
      if (!session) {
        continue
      }
      const { account } = session
      const status = yield call(Account.changePassword, currentPassword, newPassword, session.token, account.email)
      yield put(actions.fetchPasswordCompleted(status))

    } catch (e) {
      yield put(actions.fetchPasswordFailed(serializeError(e)))
      continue
    }

  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(changePasswordLoop)
}
