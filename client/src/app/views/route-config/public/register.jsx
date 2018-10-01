import { fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import Register from 'views/pages/register'

const watchRegister = function*(path) {
  while (true) {
    yield take(types[ 'ACCOUNT/REGISTER' ])

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const results = yield race({
      completed: take(types[ 'ACCOUNT/REGISTER_COMPLETED' ]),
      failed: take(types[ 'ACCOUNT/REGISTER_FAILED' ])
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
  '/register': {
    component: Register,
    exact: true,
    state: function*(path) {
      yield put(
        actions.initializeUIState(path, {
          idle: true
        })
      )

      yield fork(watchRegister, path)
    }
  }
}
