import { fork, put } from 'redux-saga/effects'

import { redirect } from 'actions/routing'
import { SESSION } from 'actions/session'
import showToast from './_toast'

export default {
  [SESSION.CREATE_SUCCESS]: function* (action) {
    yield fork(showToast, {
      type: 'info',
      value: `Welcome back, ${action.payload.account.email}. Have a nice day!`
    })
  },
  [SESSION.CREATE_FAILURE]: function* (action) {
    yield fork(showToast, {
      type: 'error',
      value: 'Error occurs when signing into your account. Please verify your email and password then try again.'
    })
  },
  [SESSION.DESTROY_SUCCESS]: function* (action) {
    yield fork(showToast, {
      type: 'info',
      value: 'You have been signed out successfully.'
    })

    yield put(redirect('/sign-in'))
  }
}
