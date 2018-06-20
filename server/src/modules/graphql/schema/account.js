import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  create as createAccount
} from 'services/account'
import {
  requestRessetPassword as requestResset
} from 'services/resetPasswordCode'

import { Account, AccountStruct } from '../types/Account'
export default () => ({
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
  },
  _requestRessetPassword: {
    args: {
      email: {
        type: GraphQLString
      }
    },
    type: GraphQLBoolean,
    resolve: async (rootValue, email, ctx) => {
      return await requestResset(email)
    }
  }
})
