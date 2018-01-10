import { delay } from 'redux-saga'
import { fork, put, race, take } from 'redux-saga/effects'

import { append, dismiss } from 'actions/message'
import { redirect } from 'actions/routing'

import { ACCOUNT } from 'actions/account'
import { PROJECT } from 'actions/project'
import { SESSION } from 'actions/session'

const DURATION = 10e3
let counter = 0

function* showMessage(message, duration = DURATION) {
  const key = counter++

  yield put(append({
    key,
    duration,
    ...message
  }))

  if (!duration) return

  yield delay(duration)

  yield put(dismiss(key))
}

function* account() {
  while (true) {
    const action = yield race({
      createSuccess: take(ACCOUNT.CREATE_SUCCESS)
    })

    if (action.createSuccess) {
      yield fork(showMessage, {
        type: 'info',
        value: `Thank you for creating account at MediaNetwork. An invitation email has been sent to ${action.createSuccess.payload.email}`
      }, false)

      yield put(redirect('/sign-in'))
    }
  }
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
      yield fork(showMessage, {
        type: 'info',
        link: `/projects/view/${action.createSuccess.payload.slug}`,
        value: `Create project [${action.createSuccess.payload.name}] successfully`
      })

      yield put(redirect('/dashboard'))
    } else if (action.createFailure) {
      yield fork(showMessage, {
        type: 'error',
        value: 'Error occurs when creating a project'
      }, false)
    } else if (action.updateSuccess) {
      yield fork(showMessage, {
        type: 'info',
        link: `/projects/view/${action.updateSuccess.payload.slug}`,
        value: `Update project [${action.updateSuccess.payload.name}] successfully`
      })
    } else if (action.updateFailure) {
      yield fork(showMessage, {
        type: 'error',
        value: 'Error occurs when updating the project'
      }, false)
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
      yield fork(showMessage, {
        type: 'info',
        value: `Welcome back ${action.createSuccess.payload.account.email}`
      })
    } else if (action.destroySuccess) {
      yield fork(showMessage, {
        type: 'info',
        value: 'You have been signed out successfully'
      })

      yield put(redirect('/sign-in'))
    }
  }
}

export default function* root() {
  yield fork(account)
  yield fork(project)
  yield fork(session)
}
