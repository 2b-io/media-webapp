import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  create as createAccount
} from 'services/account'
import {
  forgotPassword as forgotPassword,
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
  _forgotPassword: {
    args: {
      email: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (rootValue, email) => {
      return await forgotPassword(email)
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
    type: Account,
    resolve: async (rootValue, { code }) => {
      return await getResetCode(code)
    }
  }
})
