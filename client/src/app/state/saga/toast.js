import { fork, put } from 'redux-saga/effects'
import { actions } from 'state/interface'

const toast = function*({ expiring, message, type }) {
  const id = Date.now().toString()

  yield put(actions.addToast({
    expiring,
    id,
    message,
    type,
  }))
}

export const addToast = function*({
  expiring,
  message,
  type
}) {
  yield fork(toast, { expiring, message, type })
}
