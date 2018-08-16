import { call, take, fork, put } from 'redux-saga/effects'
import ResetPasswordCode from 'models/reset-password-code'
import { actions, types } from 'state/interface'
import serializeError from 'serialize-error'

const forgotPasswordLoop = function*() {
  while (true) {
    const action = yield take(types['RESETPASSWORDCODE/FORGOT_PASSWORD'])

    try {
      const status = yield call(ResetPasswordCode.forgotPassword, action.payload.email)

      if (!status) {
        throw new Error('Reset password failed')
      }

      yield put(actions.forgotPasswordCompleted(status))
    } catch (e) {
      yield put(actions.forgotPasswordFailed(serializeError(e)))
      continue
    }
  }
}

const resetPasswordLoop = function*() {
  while (true) {
    const action = yield take(types['RESETPASSWORDCODE/RESET_PASSWORD'])

    try {
      const { password, code } = action.payload

      const status = yield call(ResetPasswordCode.resetPassword, password, code)

      if (!status) {
        throw new Error('Reset password failed')
      }

      yield put(actions.resetPasswordCompleted(status))
    } catch (e) {
      yield put(actions.resetPasswordFailed(serializeError(e)))
      continue
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
