import forgotPassword from './public/forgot-password'
import register from './public/register'
import resetPassword from './public/reset-password'
import signIn from './public/sign-in'

export default {
  ...signIn,
  ...register,
  ...forgotPassword,
  ...resetPassword
}
