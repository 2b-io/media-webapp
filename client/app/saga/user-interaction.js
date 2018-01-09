import { delay } from 'redux-saga'
import { fork, put, race, take } from 'redux-saga/effects'

import { append, dismiss } from 'actions/message'
import { redirect } from 'actions/routing'

import { PROJECT } from 'actions/project'
import { SESSION } from 'actions/session'

const DURATION = 10e3

function* _autoDismissMessage(message) {
  const key = Date.now()

  yield put(append({
    key,
    ...message
  }))

  yield delay(DURATION)

  yield put(dismiss(key))
}

function* project() {
  while (true) {
    const action = yield race({
      createSuccess: take(PROJECT.CREATE_SUCCESS),
      createFailure: take(PROJECT.CREATE_FAILURE),
      updateSuccess: take(PROJECT.UPDATE_SUCCESS),
      updateFailure: take(PROJECT.UPDATE_FAILURE)
    })

    if (action.createSuccess) {
      yield put(redirect('/dashboard'))

      yield fork(_autoDismissMessage, {
        type: 'info',
        link: `/projects/view/${action.createSuccess.payload.slug}`,
        value: `Create project [${action.createSuccess.payload.name}] successfully`
      })
    } else if (action.createFailure) {
      yield fork(_autoDismissMessage, {
        type: 'error',
        value: `Error occurs when creating a project`
      })
    } else if (action.updateSuccess) {
      yield fork(_autoDismissMessage, {
        type: 'info',
        link: `/projects/view/${action.updateSuccess.payload.slug}`,
        value: `Update project [${action.updateSuccess.payload.name}] successfully`
      })
    } else if (action.updateFailure) {
      yield fork(_autoDismissMessage, {
        type: 'error',
        value: `Error occurs when updating a project`
      })
    }
  }
}

function* session() {
  while (true) {
    const action = yield race({
      createSuccess: take(SESSION.CREATE_SUCCESS),
      destroySuccess: take(SESSION.DESTROY_SUCCESS)
    })

    if (action.createSuccess) {
      yield fork(_autoDismissMessage, {
        type: 'info',
        value: `Welcome back ${action.createSuccess.payload.account.email}`
      })
    } else if (action.destroySuccess) {
      yield put(redirect('/sign-in'))

      yield fork(_autoDismissMessage, {
        type: 'info',
        value: 'You have been signed out successfully'
      })
    }
  }
}

export default function* root() {
  yield fork(project)
  yield fork(session)
}
