import ForgotPassword from 'views/pages/forgot-password'
import Register from 'views/pages/register'
import ResetPassword from 'views/pages/reset-password'
import SignIn from 'views/pages/sign-in'

import { actions } from 'state/interface'

export default {
  '/forgot-password': {
    component: ForgotPassword,
    exact: true
  },
  '/register': {
    component: Register,
    exact: true
  },
  '/reset-password/:code': {
    component: ResetPassword,
    exact: true,
    onEnter: ( code ) => [
      actions.getResetCode(code)
    ]
  },
  '/sign-in': {
    component: SignIn,
    exact: true
  }
}
