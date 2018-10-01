import { actions } from 'state/interface'

import ForgotPassword from 'views/pages/forgot-password'
import ResetPassword from 'views/pages/reset-password'

import register from './public/register'
import signIn from './public/sign-in'

export default {
  '/forgot-password': {
    component: ForgotPassword,
    exact: true
  },
  ...register,
  '/reset-password/:code': {
    component: ResetPassword,
    exact: true,
    onEnter: (code) => [
      actions.getResetCode(code)
    ]
  },
  ...signIn
}
