import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  findById as findAccountById,
  list as listAccount
} from 'services/account'

import accountType from './type'

export default {
  account: {
    type: accountType,
    args: {
      id: {
        name: 'accountId',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (root, { id }, ...rest) => findAccountById(id)
  },
  accounts: {
    type: new GraphQLList(accountType),
    resolve: async () => listAccount()
  }
}
