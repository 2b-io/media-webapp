import { call, take, fork, put, select } from 'redux-saga/effects'
import ForgotPassword from 'models/forgotPassword'
import { actions, types, selectors } from 'state/interface'

const loop = function* () {
  while (true) {
    const action = yield take(types['FORGOTPASS/FETCH'])

    try {


    } catch (e) {
      continue
    }
  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(loop)
}
