import {
  GraphQLNonNull,
} from 'graphql'
import {
  create as createAccount
} from 'services/account'

import { Account, AccountStruct } from '../types/Account'

export default {
  _createAccount: {
    args: {
      account: {
        type: new GraphQLNonNull(AccountStruct)
      }
    },
    type: Account,
    resolve: async (rootValue, { account }, ctx) => {
      return await createAccount(account)
    }
  }
}
