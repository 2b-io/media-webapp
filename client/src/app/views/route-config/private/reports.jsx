import { all, fork, put, take, race, select } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, types, selectors } from 'state/interface'
import * as Reports from 'views/pages/reports'

export default {
  '/reports': {
    component: Reports,
    exact: true,
    *state(path) {
      yield put(
        actions.fetchProjects()
      )
    }
  }
}


