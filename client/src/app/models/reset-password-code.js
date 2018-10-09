import request from 'services/graphql'

import { ACCOUNT_FRAGMENT } from './account'

export default {
  async forgotPassword({ email }) {
    const body = await request(`
      query forgotPassword($email: String!) {
        _forgotPassword(email: $email)
      }
    `, {
      email
    })

    return body._forgotPassword
  },
  async resetPassword({ account, code }) {
    const body = await request(`
      query resetPassword($account: AccountStruct!, $code: String!) {
        _resetPassword(account: $account, code: $code)
      }
    `, {
      account,
      code
    })

    return body._resetPassword
  },
  async get({ code }) {
    const body = await request(`
      query getResetCode($code: String!) {
        resetCode(code: $code) {
          ${ ACCOUNT_FRAGMENT }
        }
      }
    `, {
      code
    })

    return body.resetCode
  }
}
