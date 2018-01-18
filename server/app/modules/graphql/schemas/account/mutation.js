import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { create as createAccount } from 'services/account'

import accountType from './type'

export default {
  createAccount: {
    type: accountType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (root, { email }, ...rest) => {
      return createAccount({
        email
      })
    }
  }
}
