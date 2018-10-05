import { all, fork, put, select, take } from 'redux-saga/effects'

import { actions, types, selectors } from 'state/interface'
import * as ChangePassword from 'views/pages/change-password'
import * as EditProfile from 'views/pages/edit-profile'
import * as Profile from 'views/pages/profile'

const watchGetProfile = function*() {
  yield take(types.account.GET_FAILED)

  yield put(
    actions.requestLocation('/')
  )
}

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
  '/@:identifier/edit': {
    component: EditProfile,
    exact: true,
    *state() {
      yield fork(watchGetProfile)

      const { identifier } = yield select(selectors.currentParams)

      yield put(
        actions.getAccount(identifier)
      )
    }
  },
  '/@:identifier/change-password': {
    component: ChangePassword,
    exact: true,
    *state() {
      yield fork(watchGetProfile)

      const { identifier } = yield select(selectors.currentParams)

      yield put(
        actions.getAccount(identifier)
      )
    }
  },
  '/@:identifier': {
    component: Profile,
    exact: true,
    *state(path) {
      yield fork(watchGetProfile)
      yield fork(watchMenu, path)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getAccount(identifier)
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
