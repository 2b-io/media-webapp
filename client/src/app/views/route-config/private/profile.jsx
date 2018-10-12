import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types, selectors } from 'state/interface'
import * as ChangePassword from 'views/pages/change-password'
import * as EditProfile from 'views/pages/edit-profile'
import * as Profile from 'views/pages/profile'

const watchGetProfile = function*() {
  yield take(types.account.GET_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Cant not get your profile. Please check your network connection and try again.'
  })

  yield put(
    actions.requestLocation('/')
  )
}

const watchUpdateProfile = function*() {
  while (true) {
    const { completed, failed } = yield race({
      completed: take(types.account.UPDATE_COMPLETED),
      failed: take(types.account.UPDATE_FAILED)
    })

    if (completed) {
      yield all([
        fork(addToast, {
          type: 'success',
          message: 'Your profile has been successfully updated.'
        })
      ])
    }

    if (failed) {
      yield all([
        fork(addToast, {
          type: 'error',
          message: 'Edit profile failed. Please check your network connection and try again.'
        })
      ])
    }
  }
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
      yield fork(watchUpdateProfile)
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
