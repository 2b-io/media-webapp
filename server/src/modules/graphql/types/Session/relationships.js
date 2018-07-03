import { GraphQLString } from 'graphql'

import { Account } from '../Account'

import { findById as findAccountById } from 'services/account'

export default () => ({
  account: {
    args: {
      id: {
        type: GraphQLString
      }
    },
    type: Account,
    resolve: async (session, { id }) => {
      if (!id) {
        const { account } = session

        // add ref
        account.session = session

        return account
      }

      return await findAccountById(id)
    }
  }
})
