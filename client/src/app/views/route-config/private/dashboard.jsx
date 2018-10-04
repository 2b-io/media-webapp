import { put } from 'redux-saga/effects'

import { actions } from 'state/interface'
import * as Dashboard from 'views/pages/dashboard'

export default {
  '/': {
    topLevel: true,
    component: Dashboard,
    exact: true,
    *state() {
      yield put(
        actions.fetchProjects()
      )
    }
  }
}
