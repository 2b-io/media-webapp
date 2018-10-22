import { fork, put, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import * as Dashboard from 'views/pages/dashboard'
import { addToast } from 'state/saga/toast'

const watchFetchProjects = function*() {
  yield take(types.project.FETCH_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Project does not exists or network connection has error(s).'
  })
}

export default {
  '/': {
    topLevel: true,
    component: Dashboard,
    exact: true,
    *state() {
      yield fork(watchFetchProjects)

      yield put(
        actions.fetchProjects()
      )
    }
  }
}


