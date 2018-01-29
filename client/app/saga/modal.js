import { race, select, take } from 'redux-saga/effects'
import { MODAL } from 'actions/modal'

export default function* root() {
  // while (true) {
  //   yield race({
  //     dismiss: take(MODAL.DISMISS),
  //     open: take(MODAL.OPEN)
  //   })

  //   const states = yield select(state => state.ui.modal)

  //   const haveAnyModalOpenned = Object.values(states).filter(Boolean).length

  //   document.querySelector('#root').style.overflowY = haveAnyModalOpenned ?
  //     'hidden' : 'auto'
  // }
}
