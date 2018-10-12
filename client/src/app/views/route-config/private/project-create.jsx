import { all, fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import { addToast } from 'state/saga/toast'
import * as CreateProject from 'views/pages/create-project'

const watchCreateProject = function*(path) {
  while (true) {
    yield take(types.project.CREATE)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { completed, failed } = yield race({
      completed: take(types.project.CREATE_COMPLETED),
      failed: take(types.project.CREATE_FAILED)
    })

    if (completed) {
      const { identifier } = completed.payload.project

      yield all([
        fork(addToast, {
          type: 'success',
          message: 'create project successful.'
        }),
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        )
      ])
    }

    if (failed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Can not create project. Please check your network connection. Or contact admin for help.'
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
