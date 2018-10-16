import { fork, put } from 'redux-saga/effects'
import { actions } from 'state/interface'

const toast = function*({ message, type }) {
  const id = Date.now().toString()

  yield put(actions.addToast({
    id,
    message,
    type,
  }))
}

export const addToast = function*({ message, type }) {
  yield fork(toast, { message, type })
}
