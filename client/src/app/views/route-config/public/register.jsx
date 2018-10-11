import { fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import Register from 'views/pages/register'
import { addToast } from 'state/saga/toast'

const watchRegister = function*(path) {
  while (true) {
    yield take(types.account.REGISTER)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { completed, failed } = yield race({
      completed: take(types.account.REGISTER_COMPLETED),
      failed: take(types.account.REGISTER_FAILED)
    })

    if(completed) {
      yield fork(addToast, {
        type: 'success',
        message: 'Register accepted! Please check your inbox to finish the register process.'
      })
    }

    if(failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Register failed or email already exists on this domain.'
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
  '/register': {
    component: Register,
    exact: true,
    *state(path) {
      yield put(
        actions.initializeUIState(path, {
          idle: true
        })
      )

      yield fork(watchRegister, path)
    }
  }
}
