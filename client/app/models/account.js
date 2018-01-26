import request from 'graphql-request'

export default {
  create: async (email) => {
    const body = await request('/graphql', `
      query register($account: AccountStruct!) {
        _createAccount(account: $account) {
          _id,
          email
        }
      }
    `, {
      account: {
        email
      }
    })

    return body._createAccount
  }
}
