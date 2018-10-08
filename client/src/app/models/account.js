import pick from 'object.pick'

import request from 'services/graphql'

export const ACCOUNT_FRAGMENT = `
  identifier,
  email,
  name,
  isActive
`

export default {
  async changePassword(params, options) {
    const { currentPassword, newPassword } = params
    const { token } = options

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

  async get(params, options) {
    const { identifier } = params
    const { token } = options

    const body = await request(`
      query getAccount($identifier: String, $token: String!) {
        session(token: $token) {
          account(identifier: $identifier) {
            ${ ACCOUNT_FRAGMENT }
          }
        }
      }
    `, {
      identifier,
      token
    })

    return body.session.account
  },

  async register(params) {
    const { email } = params

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

  async update(params, options) {
    const {
      account: {
        name
      }
    } = params
    const { token } = options

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
      account: { name },
      token,
    })

    return body.session.account._update
  }
}
