import { fork, put, select, take } from 'redux-saga/effects'

import { actions, types, selectors } from 'state/interface'
import * as EditProject from 'views/pages/edit-project'

const watchGetProject = function*(path) {
  while (true) {
    yield take(types[ 'PROJECT/GET_FAILED' ])

    yield put(
      actions.requestLocation('/projects')
    )
  }
}

export default {
  '/projects/:identifier/edit': {
    component: EditProject,
    exact: true,
    state: function*(path) {
      yield fork(watchGetProject, path)

      const { identifier } = yield select(selectors.currentParams)

      yield put(
        actions.getProject(identifier)
      )
    }
  }
}
