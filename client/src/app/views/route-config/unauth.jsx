import ForgotPassword from 'views/pages/forgot-password'
import ResetPassword from 'views/pages/reset-password'
import SignIn from 'views/pages/sign-in'
import SignUp from 'views/pages/sign-up'

export default {
  '/forgot-password': {
    component: ForgotPassword
  },
  '/reset-password/:code/:id': {
    component: ResetPassword
  },
  '/sign-in': {
    component: SignIn
  },
  '/sign-up': {
    component: SignUp
  }
}
