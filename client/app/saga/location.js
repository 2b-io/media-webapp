import { put, race, select, take } from 'redux-saga/effects'

import { LOCATION, pushHistory, popHistory, replaceHistory } from 'actions/location'
import { verifySession } from 'actions/session'
import { toggleAccountMenu, toggleSystemMenu } from 'actions/drawer'

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

    // verify session when change location
    yield put(verifySession())

    const appMenuIsOpen = yield select(state => !!(state.burgerMenu.app && state.burgerMenu.app.isOpen))

    if (appMenuIsOpen) {
      // close any drawer
      yield put(toggleAccountMenu(false))
      yield put(toggleSystemMenu(false))
    }
  }
}
