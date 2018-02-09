import { Account } from '../Account'

export default (Session, SessionStruct) => ({
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
