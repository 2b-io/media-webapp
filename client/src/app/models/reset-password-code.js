import request from 'services/graphql'

export default {
  requestResset: async (email) => {
    const body = await request(`
      query requestResetPassword($email: String!) {
        _requestResetPassword(email: $email)
      }
    `, { email })
    return body._requestResetPassword
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
