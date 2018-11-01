import { fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import ForgotPassword from 'views/pages/forgot-password'
import { addToast } from 'state/saga/toast'

const watchForgotPassword = function*(path) {
  while (true) {
    yield take(types.resetPasswordCode.FORGOT_PASSWORD)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )


    const { completed, failed } = yield race({
      completed: take(types.resetPasswordCode.FORGOT_PASSWORD_COMPLETED),
      failed: take(types.resetPasswordCode.FORGOT_PASSWORD_FAILED)
    })

    if (completed) {
      yield fork(addToast, {
        expiring: '5s',
        type: 'success',
        message: 'We\'ve sent a password-reset link to your email. Please check your inbox.'
      })
    }

    if (failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Failed to send the reset password. Email or the account does not exist.'
      })
    }


    yield put(
      actions.replaceUIState(path, {
        idle: true
      })
    )
  }
}

export default {
  '/forgot-password': {
    component: ForgotPassword,
    exact: true,
    *state(path) {
      yield put(
        actions.initializeUIState(path, {
          idle: true
        })
      )

      yield fork(watchForgotPassword, path)
    }
  }
}
