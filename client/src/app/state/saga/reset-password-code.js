import { take, fork, put } from 'redux-saga/effects'

import ResetPasswordCode from 'models/reset-password-code'
import { actions, types } from 'state/interface'
import serializeError from 'serialize-error'

const forgotPasswordLoop = function*() {
  while (true) {
    try {
      // TODO should put this action into account
      const {
        payload: { email }
      } = yield take(types.resetPasswordCode.FORGOT_PASSWORD)

      yield ResetPasswordCode.forgotPassword({ email })

      yield put(
        actions.forgotPasswordCompleted()
      )
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
      // TODO should put this action into account
      const {
        payload: {
          account: { name, password },
          code
        }
      } = yield take(types.resetPasswordCode.RESET_PASSWORD)

      const status = yield ResetPasswordCode.resetPassword({
        account: { name, password },
        code
      })

      if (!status) {
        throw new Error('Reset password failed')
      }

      yield put(
        actions.resetPasswordCompleted(status)
      )
    } catch (e) {
      yield put(
        actions.resetPasswordFailed(serializeError(e))
      )
    }
  }
}

const getResetCodeLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          code
        }
      } = yield take(types.resetPasswordCode.GET_RESET_CODE)

      // TODO should be findAccountByResetCode
      const account = yield ResetPasswordCode.get({ code })

      yield put(
        actions.getResetCodeCompleted(account)
      )
    } catch (e) {
      yield put(
        actions.getResetCodeFailed(serializeError(e))
      )
    }
  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(forgotPasswordLoop)
  yield fork(getResetCodeLoop)
  yield fork(resetPasswordLoop)
}
