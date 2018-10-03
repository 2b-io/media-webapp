import { fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import * as CreateProject from 'views/pages/create-project'

const watchCreateProject = function*(path) {
  while (true) {
    yield take(types[ 'PROJECT/CREATE' ])

    yield put(
      actions.mergeUIState(path, {
        idle: true
      })
    )

    const results = yield race({
      completed: take(types[ 'PROJECT/CREATE_COMPLETED' ]),
      failed: take(types[ 'PROJECT/CREATE_FAILED' ])
    })

    yield put(
      actions.replaceUIState(path, {
        idle: true,
        error: results.failed || null,
        result: results.completed || null
      })
    )
  }
}

export default {
  '/projects/create': {
    component: CreateProject,
    exact: true,
    *state(path) {
      yield put(
        actions.initializeUIState(path, {
          idle: true
        })
      )

      yield fork(watchCreateProject, path)
    }
  }
}
