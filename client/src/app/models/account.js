import request from 'services/graphql'

export const ACCOUNT_FRAGMENT = `
  _id,
  email
`

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
    `, {
      currentPassword,
      newPassword,
      token
    })

    return body.session.account._changePassword
  },

  async get(id, token) {
    const body = await request(`
      query getAccount($id: String, $token: String!) {
        session(token: $token) {
          account(id: $id) {
            ${ ACCOUNT_FRAGMENT }
          }
        }
      }
    `, {
      id,
      token
    })

    return body.session.account
  },

  async register(email) {
    const body = await request(`
      query register($account: AccountStruct!) {
        _createAccount(account: $account) {
          ${ ACCOUNT_FRAGMENT }
        }
      }
    `, {
      account: { email }
    })

    return body._createAccount
  },
}
