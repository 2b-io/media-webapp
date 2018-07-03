import request from 'services/graphql'

export default {
  async changePassword(currentPassword, newPassword, token) {
    const body = await request(`
      query changePassword($currentPassword: String!, $newPassword: String!, $token: String!) {
        session(token: $token) {
          account {
            _changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
          }
        }
      }
    `)

    return body.session.account._changePassword
  },

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
}
