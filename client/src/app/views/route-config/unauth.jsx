import ForgotPassword from 'views/pages/forgot-password'
import Register from 'views/pages/register'
import ResetPassword from 'views/pages/reset-password'
import SignIn from 'views/pages/sign-in'

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
    exact: true
  },
  '/sign-in': {
    component: SignIn,
    exact: true
  }
}
