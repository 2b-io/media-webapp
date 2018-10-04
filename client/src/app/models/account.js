import pick from 'object.pick'

import request from 'services/graphql'

export const ACCOUNT_FRAGMENT = `
  _id,
  email,
  name
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

  async search(token, email) {
    const body = await request(`
      query search($token: String!, $email: String!) {
        session(token: $token) {
          accounts(email: $email) {
            ${ ACCOUNT_FRAGMENT }
          }
        }
      }
    `, {
      token,
      email
    })
    return body.session.accounts
  },

  async update(token, account) {
    const body = await request(`
      query updateProfile($token: String!, $account: AccountStruct!) {
        session(token: $token) {
          account {
            _update(account: $account) {
              ${ ACCOUNT_FRAGMENT }
            }
          }
        }
      }
    `, {
      token,
      account: pick(account, [ 'name' ])
    })

    return body.session.account._update
  }
}
