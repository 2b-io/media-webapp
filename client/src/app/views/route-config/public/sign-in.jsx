import { fork, put, race, take } from 'redux-saga/effects'

import { actions } from 'state/interface'
import SignIn from 'views/pages/sign-in'

const watchSignIn = function*(path) {
  while (true) {
    yield take('session/CREATE')

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const results = yield race({
      completed: take('session/CREATE_COMPLETED'),
      failed: take('session/CREATE_FAILED')
    })

    yield put(
      actions.replaceUIState(path, {
        idle: true,
        error: results.failed || null,
        result: results.completed || null
      })
    )
  }
}

export default {
  '/sign-in': {
    component: SignIn,
    exact: true,
    state: function*(path) {
      yield put(
        actions.initializeUIState(path, {
          idle: true
        })
      )

      yield fork(watchSignIn, path)
    }
  }
}
