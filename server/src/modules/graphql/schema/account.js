import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  create as createAccount
} from 'services/account'
import emailService from 'services/email'
import {
  forgotPassword,
  resetPassword,
  getResetCode
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
      const newAccount = await createAccount(account)
      const { code }  = await forgotPassword(email)

      await emailService.sendEmailRegister(email, {
        code
      })

      return newAccount
    }
  },
  _forgotPassword: {
    args: {
      email: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (rootValue, { email }) => {
      const { code } = await forgotPassword(email)

      return await emailService.sendEmailResetPassword(email, {
        code
      })
    }
  },
  _resetPassword: {
    args: {
      account: {
        type: GraphQLNonNull(AccountStruct)
      },
      code: {
        type: GraphQLNonNull(GraphQLString)
      },
    },
    type: GraphQLBoolean,
    resolve: async (rootValue, { account, code }) => {
      return await resetPassword(account, code)
    }
  },
  resetCode: {
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
