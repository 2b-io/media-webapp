import { call, take, fork, put } from 'redux-saga/effects'
import ChangePassword from 'models/account'
import { actions, types } from 'state/interface'
import serializeError from 'serialize-error'

const changePasswordLoop = function*() {
  while (true) {

    const action = yield take(types['CHANGEPASSWORD/FETCH_PASSWORD'])

    try {
      let { currentPassword, newPassword } = action.payload
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const status = yield call(ChangePassword.changePassword, currentPassword, newPassword, session.token)

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
