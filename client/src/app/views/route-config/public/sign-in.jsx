import { fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import SignIn from 'views/pages/sign-in'
import { addToast } from 'state/saga/toast'

const watchSignIn = function*(path) {
  while (true) {
    yield take(types.session.CREATE)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const results = yield race({
      completed: take(types.session.CREATE_COMPLETED),
      failed: take(types.session.CREATE_FAILED)
    })

    if (results.failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'The information that you have provided does not match our record. Please check your email and password, then try again.'
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
  '/sign-in': {
    component: SignIn,
    exact: true,
    *state(path) {
      yield put(
        actions.initializeUIState(path, {
          idle: true
        })
      )

      yield fork(watchSignIn, path)
    }
  }
}
