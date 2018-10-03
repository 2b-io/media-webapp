import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { actions, types, selectors } from 'state/interface'
import * as PullSetting from 'views/pages/pull-setting'

const watchGetData = function*() {
  while (true) {
    yield race([
      take(types[ 'PROJECT/GET_FAILED' ]),
      take(types[ 'PULLSETTING/GET_FAILED' ])
    ])

    yield put(
      actions.requestLocation('/projects')
    )
  }
}

export default {
  '/projects/:identifier/pull-setting': {
    component: PullSetting,
    exact: true,
    *state(path) {
      yield fork(watchGetData, path)

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
