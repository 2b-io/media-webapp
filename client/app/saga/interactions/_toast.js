import { delay } from 'redux-saga'
import { put } from 'redux-saga/effects'

import { append, dismiss } from 'actions/message'

const DURATION = 10e3
let counter = 0

export default function* toast(message, duration = DURATION) {
  const key = counter++

  yield put(append({
    key,
    duration,
    ...message
  }))

  if (!duration) return

  yield delay(duration)

  yield put(dismiss(key))
}
