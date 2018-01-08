import { fork, take, put } from 'redux-saga/effects'

import { END } from 'redux-saga'

function* watchLocationChanged() {
  while (true) {
    const action = yield take('@@router/LOCATION_CHANGE')

    console.log('routing', action)

    yield put(END)
  }
}

export default function* root() {
  yield fork(watchLocationChanged)
}
