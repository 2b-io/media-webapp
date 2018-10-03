import { fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import SignIn from 'views/pages/sign-in'

const watchSignIn = function*(path) {
  while (true) {
    yield take(types[ 'SESSION/CREATE' ])

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const results = yield race({
      completed: take(types[ 'SESSION/CREATE_COMPLETED' ]),
      failed: take(types[ 'SESSION/CREATE_FAILED' ])
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
