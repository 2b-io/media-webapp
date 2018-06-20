import request from 'services/graphql'

const PASSWORD_FRAGMENT = `
  data {
    success
  }
`

export default {
  requestRessetPassword: async (email) => {
    console.log('email',email);
    const body = await request(`
      query requestRessetPassword($email: String!) {
        _requestRessetPassword(email: $email) {
          ${PASSWORD_FRAGMENT}
        }
      }
    `, { email })
    console.log('body',body);
    return body
  }
}
