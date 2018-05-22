import { fork } from 'redux-saga/effects'
import { operations as location } from './location'
import { operations as session } from './session'

export default function*() {
  try {
    yield fork(location)
    yield fork(session)
  } catch (e) {
    console.warn('Unhandled exception in ReduxSaga', e)
  }
}
