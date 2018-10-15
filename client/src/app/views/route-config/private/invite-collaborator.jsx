import { all, fork, put, take, race, select } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as InviteCollaborator from 'views/pages/invite-collaborator'


const watchInviteCollaborator = function*() {
  while (true) {
    const { inviteCompleted, inviteFailed } = yield race({
      inviteCompleted: take(types.project.INVITE_COLLABORATOR_COMPLETED),
      inviteFailed: take(types.project.INVITE_COLLABORATOR_FAILED)
    })

    if (inviteCompleted) {
      yield all([
        fork(addToast, {
          type: 'success',
          message: 'Your invitation has been successfully sent.'
        }),
        put(
          actions.requestLocation(`/projects/${ inviteCompleted.payload.identifier }`)
        )
      ])
    }

    if (inviteFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Your invitation could not be sent. Emails is exist or network connection error.'
      })
    }
  }
}

export default {
  '/projects/:identifier/invite-collaborator': {
    component: InviteCollaborator,
    exact: true,
    *state() {
      yield fork(watchInviteCollaborator)
      const { identifier } = yield select(selectors.currentParams)

      yield put(
        actions.getProject(identifier)
      )
    }
  }
}
