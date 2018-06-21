import request from 'services/graphql'

export default {
  requestRessetPassword: async (email) => {
    const body = await request(`
      query requestRessetPassword($email: String!) {
        _requestRessetPassword(email: $email)
      }
    `, { email })
    return body._requestRessetPassword
  },
  ressetPassword: async (password,code,id) => {
    const body = await request(`
      query ressetPassword($password: String!,$code: String!,$id: String!) {
        _ressetPassword(password: $password,code: $code,id: $id)
      }
    `, { password,code,id })
    return body._ressetPassword
  }
}
