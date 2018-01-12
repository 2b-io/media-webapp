import { fork, race, take } from 'redux-saga/effects'

import account from './interactions/account'
import project from './interactions/project'
import session from './interactions/session'

function* interact(interactions) {
  while (true) {
    const types = Object.keys(interactions)

    const actions = yield race(
      types.reduce((combine, type) => {
        combine[type] = take(type)

        return combine
      }, {})
    )

    for (let i = 0; i < types.length; i++) {
      let type = types[i]

      if (!actions[type]) {
        continue
      }

      yield fork(interactions[type], actions[type])
    }
  }
}

export default function* root() {
  yield fork(interact, account)
  yield fork(interact, project)
  yield fork(interact, session)
}
