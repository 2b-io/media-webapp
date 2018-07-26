import request from 'services/graphql'

export default {
  requestResset: async (email) => {
    const body = await request(`
      query requestRessetPassword($email: String!) {
        _requestRessetPassword(email: $email)
      }
    `, { email })
    return body._requestRessetPassword
  },
  ressetPassword: async (password, code) => {
    const body = await request(`
      query ressetPassword($password: String!,$code: String!) {
        _ressetPassword(password: $password,code: $code)
      }
    `, { password, code })
    return body._ressetPassword
  }
}
