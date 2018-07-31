import request from 'services/graphql'

export default {
  forgotPassword: async (email) => {
    const body = await request(`
      query forgotPassword($email: String!) {
        _forgotPassword(email: $email)
      }
    `, { email })
    return body._forgotPassword
  },
  resetPassword: async (password, code) => {
    const body = await request(`
      query resetPassword($password: String!,$code: String!) {
        _resetPassword(password: $password,code: $code)
      }
    `, { password, code })
    return body._resetPassword
  },
  getResetCode: async (code) => {
    const body = await request(`
      query getResetCode($code: String!) {
        getResetCode(code: $code) {
          email
        }
      }
    `, { code })
    return body.getResetCode
  }
}
