import { actions } from 'state/interface'

import ForgotPassword from 'views/pages/forgot-password'
import Register from 'views/pages/register'
import ResetPassword from 'views/pages/reset-password'

import signIn from './public/sign-in'

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
    onEnter: (code) => [
      actions.getResetCode(code)
    ]
  },
  ...signIn
}
