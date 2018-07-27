import { all, call, take, fork, put } from 'redux-saga/effects'
import ResetPasswordCode from 'models/reset-password-code'
import { actions, types } from 'state/interface'
import serializeError from 'serialize-error'

import { addToast } from './toast'

const fetchEmailLoop = function*() {
  while (true) {

    const action = yield take(types['RESETPASSWORDCODE/FETCH_EMAIL'])

    try {
      const status =  yield call(ResetPasswordCode.requestResset, action.payload.email)

      yield all([
        put(actions.fetchEmailCompleted(status)),
        fork(addToast, {
          type: 'success',
          message: 'Request reset password success'
        })
      ])
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

      const statusReset = yield call(ResetPasswordCode.resetPassword, password, code)

      yield put(actions.fetchPasswordResetCompleted(statusReset))

    } catch (e) {
      yield put(actions.fetchPasswordResetFailed(serializeError(e)))
      continue
    }

  }
}
const getResetCodeLoop = function*() {
  while (true) {

    const action = yield take(types['RESETPASSWORDCODE/GET_RESET_CODE'])

    try {
      let { code } = action.payload

      const account = yield call(ResetPasswordCode.getResetCode, code)

      yield put(actions.getResetCodeCompleted(account))

    } catch (e) {
      yield put(actions.getResetCodeFailed(serializeError(e)))
      continue
    }
  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(fetchEmailLoop)
  yield fork(resetPasswordLoop)
  yield fork(getResetCodeLoop)
}
