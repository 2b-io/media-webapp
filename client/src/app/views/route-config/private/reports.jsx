import { put } from 'redux-saga/effects'

import { actions } from 'state/interface'
import * as Reports from 'views/pages/reports'

export default {
  '/reports': {
    component: Reports,
    exact: true,
    *state() {
      yield put(
        actions.fetchProjects()
      )
    }
  }
}


