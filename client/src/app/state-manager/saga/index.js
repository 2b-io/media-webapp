import { fork } from 'redux-saga/effects'

import location from './location'

export default function* root() {
  yield fork(location)
}
