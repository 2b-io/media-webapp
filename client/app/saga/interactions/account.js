import { fork, put } from 'redux-saga/effects'

import { redirect } from 'actions/routing'
import { ACCOUNT } from 'actions/account'
import showToast from './_toast'

export default {
  [ACCOUNT.CREATE_SUCCESS]: function* (action) {
    yield fork(showToast, {
        type: 'info',
        value: `Thank you for creating account at MediaNetwork. An invitation email has been sent to ${action.payload.email}.`
      }, false)

      yield put(redirect('/sign-in'))
  }
}
