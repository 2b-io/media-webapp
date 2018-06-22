import { call, take, fork, put } from 'redux-saga/effects'
import ResetPasswordCode from 'models/resetPasswordCode'
import { actions, types } from 'state/interface'

const fetchEmail = function* () {
  while (true) {
    const fetchEmail = yield take(types['RESETPASSWORDCODE/FETCH'])
    try {
      const emailExist =  yield call(ResetPasswordCode.requestRessetPassword, fetchEmail.payload.email)
      yield put(actions.receiveEmailExist(emailExist))
    } catch (e) {
      continue
    }

  }
}
const fetchPassword = function* () {
  while (true) {
    const fetchPassword = yield take(types['RESETPASSWORDCODE/FETCH_PASSWORD'])
    try {
      let { password, code, id } = fetchPassword.payload
      const statusResetPassword =  yield call(ResetPasswordCode.ressetPassword, password, code, id)
      yield put(actions.receiveResetPassword(statusResetPassword))
    } catch (e) {
      continue
    }

  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(fetchEmail)
  yield fork(fetchPassword)
}
