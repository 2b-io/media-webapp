import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  create as createAccount
} from 'services/account'
import {
  requestRessetPassword as requestResset,
  ressetPassword as ressetPassword,
  getResetCode as getResetCode
} from 'services/reset-password-code'

import { Account, AccountStruct } from '../types/Account'
export default () => ({
  _createAccount: {
    args: {
      account: {
        type: new GraphQLNonNull(AccountStruct)
      }
    },
    type: Account,
    resolve: async (rootValue, { account }) => {
      return await createAccount(account)
    }
  },
  _requestResetPassword: {
    args: {
      email: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (rootValue, email) => {
      return await requestResset(email)
    }
  },
  _resetPassword: {
    args: {
      password: {
        type: GraphQLNonNull(GraphQLString)
      },
      code: {
        type: GraphQLNonNull(GraphQLString)
      },

    },
    type: GraphQLBoolean,
    resolve: async (rootValue, { password, code }) => {
      return await ressetPassword(password, code)
    }
  },
  getResetCode: {
    args: {
      code: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (rootValue, { code }) => {
      return await getResetCode(code)
    }
  }
})
