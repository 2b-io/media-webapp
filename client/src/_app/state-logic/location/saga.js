import delay from 'delay'
import { put, race, take } from 'redux-saga/effects'
import { accept } from 'state-logic/location/actions'

export default function* root() {
  while (true) {
    const { init, request } = yield race({
      init: take('location.init'),
      request: take('location.request')
    })

    if (init) {
      yield delay(5000)
    }

    // check auth here

    yield put(
      accept((init || request).payload.pathname)
    )
  }
}