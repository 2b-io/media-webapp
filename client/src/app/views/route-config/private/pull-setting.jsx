import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types, selectors } from 'state/interface'
import * as PullSetting from 'views/pages/pull-setting'

const watchGetProject = function*() {
  const { identifier } = yield select(selectors.currentParams)

  const { completed, failed } = yield race({
    completed: take(types.project.GET_COMPLETED),
    failed: take(types.project.GET_FAILED)
  })

  if (failed) {
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

  if (completed) {
    const { isActive, status } = completed.payload.project

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
}

const watchGetPullSetting = function*() {
  yield take(types.pullSetting.GET_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Pull setting does not exist or internet connection has error.'
  })
}

const watchUpdatePullSetting = function*(path) {
  while (true) {
    yield take(types.pullSetting.UPDATE)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const {
      updateComPleted,
      updateFailed
    } = yield race({
      updateComPleted: take(types.pullSetting.UPDATE_COMPLETED),
      updateFailed: take(types.pullSetting.UPDATE_FAILED)
    })

    if (updateComPleted) {
      yield fork(addToast, {
        type: 'success',
        message: 'Pull setting has been updated.'
      })
    }

    if (updateFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Cannot update the pull setting. Please check your network connection and try again.'
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
  '/projects/:identifier/pull-setting': {
    component: PullSetting,
    exact: true,
    *state(path) {
      yield fork(watchGetProject)
      yield fork(watchGetPullSetting)
      yield fork(watchUpdatePullSetting, path)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.getPullSetting(identifier)
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
