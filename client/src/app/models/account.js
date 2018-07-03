import request from 'services/graphql'

export default {
  async register(email) {
    const body = await request(`
      query register($account: AccountStruct!) {
        _createAccount(account: $account) {
          _id,
          email
        }
      }
    `, {
      account: { email }
    })

    return body._createAccount
  },
  changePassword: async ( currentPassword, newPassword, token, email ) => {
    const body = await request(`
      query changePassword($currentPassword: String!,$newPassword: String!, $token: String!,$email: String! ) {
        session(token: $token) {
          account {
            _updatePassword (
              currentPassword: $currentPassword,
              newPassword: $newPassword,
              email: $email
            )
          }
        }
      }
    `,
      { currentPassword, newPassword, token, email })
    return body.session.account._updatePassword
  }
}
