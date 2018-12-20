import { GraphQLString, GraphQLList } from 'graphql'

import { Account } from '../account'
import createAccountService from 'services/account'

export default () => ({
  account: {
    args: {
      identifier: {
        type: GraphQLString
      }
    },
    type: Account,
    resolve: async (session, { identifier }, ctx) => {
      if (!identifier) {
        const { account } = session

        // add ref
        account.session = session

        return account
      }

      const accountService = createAccountService(ctx._session.account.identifier)

      return await accountService.get(identifier)
    }
  }
  // accounts: {
  //   args: {
  //     email: {
  //       type: GraphQLString
  //     }
  //   },
  //   type: new GraphQLList(Account),
  //   resolve: async (session, { email }) => {
  //     const accountService = createAccountService()

  //     return await accountService.list({ email })
  //   }
  // }
})
