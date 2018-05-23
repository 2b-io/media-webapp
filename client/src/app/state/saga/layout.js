import { types } from 'state/ducks/session'

import { take } from 'redux-saga/effects'

console.log(types)

export default function*() {
  while (true) {
    const action = yield take(types.CREATE_COMPLETED)

    console.log('ahihi')
  }
}
