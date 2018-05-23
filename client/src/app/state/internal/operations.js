import { all, fork } from 'redux-saga/effects'

import * as saga from './saga'

export default function*() {
  try {
    yield all(
      Object.values(saga).map(f => fork(f))
    )
  } catch (e) {
    console.warn('Unhandled Exception in Saga', e)
  }
}
