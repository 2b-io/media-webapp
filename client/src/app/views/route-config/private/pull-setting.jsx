import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types, selectors } from 'state/interface'
import * as PullSetting from 'views/pages/pull-setting'

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

const watchGetPullSetting = function*() {
  yield take(types.pullSetting.GET_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Get pull setting failed.'
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
        message: 'Update pull setting completed.'
      })
    }

    if (updateFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Update pull setting failed.'
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
