import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { actions, types, selectors } from 'state/interface'
import * as ChangePassword from 'views/pages/change-password'
import * as EditProfile from 'views/pages/edit-profile'
import * as Profile from 'views/pages/profile'
import { addToast } from 'state/saga/toast'

const watchChangePassword = function*(path) {
  while (true) {
    yield take(types.account.CHANGE_PASSWORD)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { completed, failed } = yield race({
      completed: take(types.account.CHANGE_PASSWORD_COMPLETED),
      failed: take(types.account.CHANGE_PASSWORD_FAILED)
    })

    if (completed) {
      yield all([
        fork(addToast, {
          expiring: '5s',
          type: 'success',
          message: 'Your password has been successfully changed.'
        }),
        put(
          actions.closeLayout()
        )
      ])
    }

    if (failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Failed to change your password. Please check your network connection and try again.'
      })
    }

    yield put(
      actions.replaceUIState(path, {
        idle: true
      })
    )
  }
}

const watchGetProfile = function*(path) {
  const { completed, failed } = yield race({
    completed: take(types.account.GET_COMPLETED),
    failed: take(types.account.GET_FAILED)
  })

  if (failed) {
    yield fork(addToast, {
      type: 'error',
      message: 'Cannot get your profile. Please check your network connection and try again.'
    })

    yield put(
      actions.requestLocation('/')
    )
  }

  yield put(
    actions.mergeUIState(path, {
      idle: true
    })
  )
}

const watchUpdateProfile = function*(path) {
  while (true) {
    yield take(types.account.UPDATE)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { completed, failed } = yield race({
      completed: take(types.account.UPDATE_COMPLETED),
      failed: take(types.account.UPDATE_FAILED)
    })

    if (completed) {
      yield fork(addToast, {
        expiring: '5s',
        type: 'success',
        message: 'Your profile has been successfully updated.'
      })
    }

    if (failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Failed to edit your profile. Please check your network connection and try again.'
      })
    }

    yield put(
      actions.replaceUIState(path, {
        idle: true
      })
    )
  }
}

const watchMenu = function*(path) {
  while (true) {
    yield take(types.menu.SHOW)

    yield put(
      actions.mergeUIState(path, {
        isMenuActive: true
      })
    )

    yield take(types.menu.HIDE)

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
    *state(path) {
      yield fork(watchUpdateProfile, path)
      yield fork(watchGetProfile, path)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getAccount(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            idle: false
          })
        )
      ])
    }
  },
  '/@:identifier/change-password': {
    component: ChangePassword,
    exact: true,
    *state(path) {
      yield fork(watchChangePassword, path)
      yield fork(watchGetProfile, path)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getAccount(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            idle: false
          })
        )
      ])
    }
  },
  '/@:identifier': {
    component: Profile,
    exact: true,
    *state(path) {
      yield fork(watchGetProfile, path)
      yield fork(watchMenu, path)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getAccount(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            isMenuActive: false,
            idle: false
          })
        )
      ])
    }
  }
}
