import { Account } from '../Account'

export default () => ({
  account: {
    type: Account,
    resolve: async (session) => {
      const { account } = session

      // add ref
      account.session = session

      return account
    }
  }
})
