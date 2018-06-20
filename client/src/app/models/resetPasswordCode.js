import request from 'services/graphql'

export default {
  requestRessetPassword: async (email) => {
    const body = await request(`
      query requestRessetPassword($email: String!) {
        _requestRessetPassword(email: $email)
      }
    `, { email })
    return body._requestRessetPassword
  }
}
