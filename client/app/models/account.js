import pick from 'object.pick'
import request from 'graphql-request'

export default {
  create: async ({ account }) => {
    const body = await request('/graphql', `
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
}
