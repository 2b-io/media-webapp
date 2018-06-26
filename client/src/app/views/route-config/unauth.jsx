import ForgotPassword from 'views/pages/forgot-password'
import Register from 'views/pages/register'
import ResetPassword from 'views/pages/reset-password'
import SignIn from 'views/pages/sign-in'

export default {
  '/forgot-password': {
    component: ForgotPassword
  },
  '/register': {
    component: Register
  },
  '/reset-password/:code': {
    component: ResetPassword
  },
  '/sign-in': {
    component: SignIn
  }
}
