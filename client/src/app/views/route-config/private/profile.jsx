import { all, fork, put, select, take } from 'redux-saga/effects'

import { actions, types, selectors } from 'state/interface'
import * as ChangePassword from 'views/pages/change-password'
import * as EditProfile from 'views/pages/edit-profile'
import * as Profile from 'views/pages/profile'

const watchMenu = function*(path) {
  while (true) {
    yield take(types[ 'MENU/SHOW' ])

    yield put(
      actions.mergeUIState(path, {
        isMenuActive: true
      })
    )

    yield take(types[ 'MENU/HIDE' ])

    yield put(
      actions.mergeUIState(path, {
        isMenuActive: false
      })
    )
  }
}

export default {
  '/@:id/edit': {
    component: EditProfile,
    exact: true,
    onEnter: ({ id }) => [
      actions.getAccount(id)
    ]
  },
  '/@:id/change-password': {
    component: ChangePassword,
    exact: true,
    onEnter: ({ id }) => [
      actions.getAccount(id)
    ]
  },
  '/@:id': {
    component: Profile,
    exact: true,
    state: function*(path) {
      yield fork(watchMenu, path)

      const { id } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getAccount(id)
        ),
        put(
          actions.initializeUIState(path, {
            isMenuActive: false
          })
        )
      ])
    }
  }
}
