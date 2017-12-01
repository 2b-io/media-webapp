import { put, race, take } from 'redux-saga/effects'

import { LOCATION, pushHistory, popHistory, replaceHistory } from 'actions/location'
import { verifySession } from 'actions/session'

export default function* root() {
  while (true) {
    const { push, pop, replace } = yield race({
      push: take(LOCATION.PUSH),
      pop: take(LOCATION.POP),
      replace: take(LOCATION.REPLACE)
    })

    if (push) {
      yield put(pushHistory(push.payload.pathname))
    }

    if (pop) {
      yield put(popHistory(pop.payload.pathname))
    }

    if (replace) {
      yield put(replaceHistory(replace.payload.pathname))
    }

    yield put(verifySession())
  }
}
