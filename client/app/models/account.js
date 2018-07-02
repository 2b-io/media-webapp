import pick from 'object.pick'
import request from 'services/graphql'

export default {
  create: async ({ account }) => {
    const body = await request(`
      query register($account: AccountStruct!) {
        _createAccount(account: $account) {
          _id,
          email
        }
      }
    `, {
      account: pick(account, [ 'email' ])
    })

    return body._createAccount
  }
  changePassword: async ({ account }) => {
    const body = await request(`
      query changePassword($account: AccountStruct!) {
        _createAccount(account: $account) {
          _id,
          email
        }
      }
    `, {
      account: pick(account, [ 'email' ])
    })

    return body._createAccount
  }
}
