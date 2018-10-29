import { GraphQLString, GraphQLList } from 'graphql'

import { Account } from '../Account'

import {
  findByIdentifier as findAccountByIdentifier,
  searchByEmail as searchAccountsByEmail
} from 'services/account'

export default () => ({
  account: {
    args: {
      identifier: {
        type: GraphQLString
      }
    },
    type: Account,
    resolve: async (session, { identifier }) => {
      if (!identifier) {
        const { account } = session

        // add ref
        account.session = session

        return account
      }

      return await findAccountByIdentifier(identifier)
    }
  },
  accounts: {
    args: {
      email: {
        type: GraphQLString
      }
    },
    type: new GraphQLList(Account),
    resolve: async (session, { email }) => {
      const accounts = await searchAccountsByEmail(email)

      return accounts
    }
  }
})
