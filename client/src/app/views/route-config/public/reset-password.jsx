import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import ResetPassword from 'views/pages/reset-password'

const watchGetResetCode = function*(path) {
  yield take(types.resetPasswordCode.GET_RESET_CODE)

  const { completed, failed } = yield race({
    completed: take(types.resetPasswordCode.GET_RESET_CODE_COMPLETED),
    failed: take(types.resetPasswordCode.GET_RESET_CODE_FAILED)
  })

  yield put(
    actions.mergeUIState(path, {
      account: completed ?
        completed.payload.account : null,
      error: failed ?
        failed.payload.reason : null
    })
  )
}

const watchResetPassword = function*(path) {
  while (true) {
    const { payload } = yield take(types.resetPasswordCode.RESET_PASSWORD)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { completed, failed } = yield race({
      completed: take(types.resetPasswordCode.RESET_PASSWORD_COMPLETED),
      failed: take(types.resetPasswordCode.RESET_PASSWORD_FAILED)
    })

    if (completed) {
      yield all([
        fork(addToast, {
          expiring: '5s',
          type: 'success',
          message: payload.account.isActive ?
            'Your password has been successfully changed.' :
            'Your password was successfully set.'
        }),
        put(
          actions.requestLocation('/sign-in')
        )
      ])
    }

    if (failed) {
      yield fork(addToast, {
        type: 'error',
        message: payload.account.isActive ?
          'Password was unsuccessully changed. Please check your network connection and try again.' :
          'Failed to set new password. Please check your network connection and try again.'
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
  '/reset-password/:code': {
    component: ResetPassword,
    exact: true,
    *state(path) {
      yield fork(watchGetResetCode, path)
      yield fork(watchResetPassword, path)

      const { code } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getResetCode(code)
        ),
        put(
          actions.initializeUIState(path, {
            code,
            idle: true
          })
        )
      ])
    }
  }
}
