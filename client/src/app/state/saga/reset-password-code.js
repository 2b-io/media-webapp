import { call, take, fork, put } from 'redux-saga/effects'
import ResetPasswordCode from 'models/reset-password-code'
import { actions, types } from 'state/interface'
import serializeError from 'serialize-error'

const forgotPasswordLoop = function*() {
  while (true) {
    try {
      const {
        payload: { email }
      } = yield take(types['RESETPASSWORDCODE/FORGOT_PASSWORD'])

      yield ResetPasswordCode.forgotPassword(email)

      yield put(actions.forgotPasswordCompleted())
    } catch (e) {
      yield put(
        actions.forgotPasswordFailed(serializeError(e))
      )
    }
  }
}

const resetPasswordLoop = function*() {
  while (true) {
    try {
      const { payload } = yield take(types['RESETPASSWORDCODE/RESET_PASSWORD'])

      const status = yield ResetPasswordCode.resetPassword(payload)

      if (!status) {
        throw new Error('Reset password failed')
      }

      yield put(actions.resetPasswordCompleted(status))
    } catch (e) {
      yield put(actions.resetPasswordFailed(serializeError(e)))
    }
  }
}

const getResetCodeLoop = function*() {
  while (true) {

    const action = yield take(types['RESETPASSWORDCODE/GET_RESET_CODE'])

    try {
      const { code } = action.payload

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
  yield fork(forgotPasswordLoop)
  yield fork(getResetCodeLoop)
  yield fork(resetPasswordLoop)
}
