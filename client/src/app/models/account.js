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
  }
}
