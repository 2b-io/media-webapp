import { fork } from 'redux-saga/effects'

import location from 'state-logic/location/saga'

export default function* root() {
  yield fork(location)
}
