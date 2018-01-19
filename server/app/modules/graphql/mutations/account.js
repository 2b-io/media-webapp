import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  create as createAccount
} from 'services/account'
import Account from '../types/Account'

export default {
  createAccount: {
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Account,
    resolve: async (rootValue, args, ctx) => {
      const account = await createAccount(args)

      return account
    }
  }
}
