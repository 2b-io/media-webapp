import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { actions, selectors, types } from 'state/interface'
import ResetPassword from 'views/pages/reset-password'

const watchGetResetCode = function*(path) {
  yield take(types[ 'RESETPASSWORDCODE/GET_RESET_CODE' ])

  const { completed, failed } = yield race({
    completed: take(types[ 'RESETPASSWORDCODE/GET_RESET_CODE_COMPLETED' ]),
    failed: take(types[ 'RESETPASSWORDCODE/GET_RESET_CODE_FAILED' ])
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
    yield take(types[ 'RESETPASSWORDCODE/RESET_PASSWORD'])

    const { completed, failed } = yield race({
      completed: take(types[ 'RESETPASSWORDCODE/RESET_PASSWORD_COMPLETED' ]),
      failed: take(types[ 'RESETPASSWORDCODE/RESET_PASSWORD_FAILED' ])
    })

    if (completed) {
      yield put(
        actions.requestLocation('/sign-in')
      )
    }

    if (failed) {
      yield put(
        actions.mergeUIState(path, {
          resetPasswordError: failed.payload.reason
        })
      )
    }
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
            code
          })
        )
      ])
    }
  }
}
