import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types, selectors } from 'state/interface'
import * as PullSetting from 'views/pages/pull-setting'

const watchGetData = function*() {
  while (true) {
    const {
      getProjectFailed,
      getPullSettingFailed
    } = yield race({
      getProjectFailed: take(types.project.GET_FAILED),
      getPullSettingFailed: take(types.pullSetting.GET_FAILED)
    })

    if (getProjectFailed) {
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

    if (getPullSettingFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Get pull setting failed.'
      })
    }
  }
}

const watchUpdatePullSetting = function*() {
  while (true) {
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
  }
}

export default {
  '/projects/:identifier/pull-setting': {
    component: PullSetting,
    exact: true,
    *state() {
      yield fork(watchGetData)
      yield fork(watchUpdatePullSetting)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.getPullSetting(identifier)
        )
      ])
    }
  }
}
