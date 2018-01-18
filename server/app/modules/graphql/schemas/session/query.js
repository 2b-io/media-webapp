import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  findById as findAccountById,
  list as listAccount
} from 'services/account'

import sessionType from './type'

export default {
  account: {
    type: sessionType,
    args: {
      id: {
        name: 'accountId',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (root, { id }, ...rest) => findAccountById(id)
  },
  accounts: {
    type: new GraphQLList(sessionType),
    resolve: async () => listAccount()
  }
}
