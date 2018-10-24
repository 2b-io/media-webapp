import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as CacheSetting from 'views/pages/cache-setting'

const watchGetInitializeData = function*() {
  const { identifier } = yield select(selectors.currentParams)

  const { cacheSetting, getProjectCompleted, getProjectFailed } = yield race({
    getProjectCompleted: take(types.project.GET_COMPLETED),
    getProjectFailed: take(types.project.GET_FAILED),
    cacheSetting: take(types.cacheSetting.GET_FAILED)
  })

  if (getProjectFailed) {
    yield all([
      fork(addToast, {
        type: 'error',
        message: 'Cannot connect to project. Project does not exist or network has error(s).'
      }),
      put(
        actions.requestLocation('/projects')
      )
    ])
  }

  if (getProjectCompleted) {
    const { isActive, status } = getProjectCompleted.payload.project

    if (!(isActive === true && status === 'DEPLOYED')) {
      yield all([
        fork(addToast, {
          type: 'error',
          message: 'Project is initializing or disabled.'
        }),
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        )
      ])
    }
  }

  if (cacheSetting) {
    yield all([
      fork(addToast, {
        type: 'error',
        message: 'Cache setting does not exist or internet connection has error.'
      }),
      put(
        actions.requestLocation('/projects')
      )
    ])
  }

  yield put(
    actions.requestLocation('/projects')
  )
}

const watchUpdateCacheSetting = function*(path) {
  while (true) {
    yield take(types.cacheSetting.UPDATE)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const {
      completed,
      failed
    } = yield race({
      completed: take(types.cacheSetting.UPDATE_COMPLETED),
      failed: take(types.cacheSetting.UPDATE_FAILED)
    })

    if (completed) {
      yield fork(addToast, {
        type: 'success',
        message: 'Cache setting has been updated.'
      })
    }

    if (failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Cannot update the cache setting. Please check your network connection and try again.'
      })
    }

    yield put(
      actions.replaceUIState(path, {
        idle: true
      })
    )
  }
}

export default {
  '/projects/:identifier/cache-setting': {
    component: CacheSetting,
    exact: true,
    *state(path) {
      yield fork(watchGetInitializeData)
      yield fork(watchUpdateCacheSetting, path)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.getCacheSetting(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            idle: true
          })
        )
      ])
    }
  }
}
