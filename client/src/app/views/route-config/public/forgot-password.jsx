import { fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import ForgotPassword from 'views/pages/forgot-password'

const watchForgotPassword = function*(path) {
  while (true) {
    const { completed, failed } = yield race({
      completed: take(types[ 'RESETPASSWORDCODE/FORGOT_PASSWORD_COMPLETED' ]),
      failed: take(types[ 'RESETPASSWORDCODE/FORGOT_PASSWORD_FAILED' ])
    })

    yield put(
      actions.mergeUIState(path, {
        completed: !!completed,
        failed: !!failed
      })
    )
  }
}

export default {
  '/forgot-password': {
    component: ForgotPassword,
    exact: true,
    *state(path) {
      yield fork(watchForgotPassword, path)
    }
  }
}
