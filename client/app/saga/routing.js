import { fork, take, put, select } from 'redux-saga/effects'
import { ROUTING, redirect } from 'actions/routing'
import { SESSION } from 'actions/session'


function* watchUnauthorizedAccesses() {
  while (true) {
    const action = yield take(ROUTING.REJECT)

    const token = yield select(state => state.app.session.token)

    if (token) {
      yield put({
        type: SESSION.DESTROY_REQUEST
      })

      yield take(SESSION.DESTROY_SUCCESS)
    }

    yield put(redirect('/sign-in'))
  }
}

export default function* root() {
  yield fork(watchUnauthorizedAccesses)
}
