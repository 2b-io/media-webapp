import { call, fork, put, take } from 'redux-saga/effects'

import { SESSION } from 'actions/session'

import Session from 'models/session'

export function* watchSignInRequest() {
  while (true) {
    const action = yield take(SESSION.SIGN_IN_REQUEST)

    try {
      const session = yield call(Session.create, action.payload)

      yield put({
        type: SESSION.SIGN_IN_SUCCESS,
        payload: session
      })
    } catch (err) {
      yield put({
        type: SESSION.SIGN_IN_FAILURE,
        error: err
      })
    }
  }
}

export default function* root() {
  yield fork(watchSignInRequest)
}
