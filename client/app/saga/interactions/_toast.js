import { delay } from 'redux-saga'
import { put } from 'redux-saga/effects'

import { append, dismiss } from 'actions/message'

const DURATION = 5e3 - 200
// const DURATION = 0
let counter = 0

export default function* toast(message, duration = DURATION) {
  const key = counter++

  yield put(append({
    key,
    duration,
    ...message
  }))

  if (!duration) return

  yield delay(duration + 200)

  yield put(dismiss(key))
}
