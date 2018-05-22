import { fork } from 'redux-saga/effects'
import { operations as session } from './session'

export default function*() {
  yield fork(session)
}
