import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as CacheSetting from 'views/pages/cache-setting'

const watchGetProject = function*() {
  yield take(types.project.GET_FAILED)

  yield all([
    fork(addToast, {
      type: 'error',
      message: 'Project does not exist or internet connection error.'
    }),
    put(
      actions.requestLocation('/projects')
    )
  ])
}

const watchGetCacheSetting = function*() {
  yield take(types.cacheSetting.GET_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Get cache setting failed.'
  })
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
        message: 'Update cache setting completed.'
      })
    }

    if (failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Update cache setting failed.'
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
      yield fork(watchGetProject)
      yield fork(watchGetCacheSetting)
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
