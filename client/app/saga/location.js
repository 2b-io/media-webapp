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

    const systemMenuIsOpen = yield select(state => !!(state.burgerMenu.system && state.burgerMenu.system.isOpen))

    if (systemMenuIsOpen) {
      yield put(toggleSystemMenu(false))
    }

    const accountMenuIsOpen = yield select(state => !!(state.burgerMenu.account && state.burgerMenu.account.isOpen))

    if (accountMenuIsOpen) {
      yield put(toggleAccountMenu(false))
    }
  }
}
