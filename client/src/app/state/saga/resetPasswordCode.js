import { call, take, fork, put } from 'redux-saga/effects'
import ResetPasswordCode from 'models/resetPasswordCode'
import { actions, types } from 'state/interface'
import serializeError from 'serialize-error'

const fetchEmailLoop = function*() {
  while (true) {

    const action = yield take(types['RESETPASSWORDCODE/FETCH_EMAIL'])

    try {
      const status =  yield call(ResetPasswordCode.requestResset, action.payload.email)

      yield put(actions.fetchEmailCompleted(status))

    } catch (e) {
      yield put(actions.fetchEmailFailed(serializeError(e)))
      continue
    }

  }
}
const resetPasswordLoop = function*() {
  while (true) {

    const action = yield take(types['RESETPASSWORDCODE/FETCH_PASSWORD_RESET'])

    try {
      let { password, code } = action.payload

      const statusReset = yield call(ResetPasswordCode.ressetPassword, password, code)
      console.log("statusResetPassword",statusReset)
      yield put(actions.fetchPasswordResetCompleted(statusReset))

    } catch (e) {
      yield put(actions.fetchPasswordResetFailed(serializeError(e)))
      continue
    }

  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(fetchEmailLoop)
  yield fork(resetPasswordLoop)
}
