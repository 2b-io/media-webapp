import { put, select } from 'redux-saga/effects'

import { actions, selectors } from 'state/interface'
import * as InviteCollaborator from 'views/pages/invite-collaborator'

export default {
  '/projects/:identifier/invite-collaborator': {
    component: InviteCollaborator,
    exact: true,
    *state() {
      const { identifier } = yield select(selectors.currentParams)

      yield put(
        actions.getProject(identifier)
      )
    }
  }
}
