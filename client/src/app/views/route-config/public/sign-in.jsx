import { take } from 'redux-saga/effects'

import SignIn from 'views/pages/sign-in'

export default {
  '/sign-in': {
    component: SignIn,
    exact: true,
    state: function*() {
      while (true) {
        yield take('session/CREATE_COMPLETED')

        console.log('sign in success')
      }
    }
  }
}
