import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  create as createAccount
} from 'services/account'
import emailService from 'services/email'

import createAccountService from 'services/account'
import createResetPasswordService from 'services/reset-password-code'

import { Account, AccountStruct } from '../types/account'

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
      const { code }  = await forgotPassword(newAccount.email)

      await emailService.sendEmailRegister(newAccount.email, {
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
      const resetPasswordService = createResetPasswordService()
      const { token } = await resetPasswordService.forgotPassword({ email })

      return await emailService.sendEmailResetPassword(email, {
        code: token
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
      const resetPasswordService = createResetPasswordService()
      const { accountIdentifier } = await resetPasswordService.getResetCode({ token: code })

      const accountService = createAccountService(accountIdentifier)
      const updatedAccount = await accountService.changePassword(accountIdentifier, {
        token: code,
        newPassword: account.password
      })

      return updatedAccount
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
      const resetPasswordService = createResetPasswordService()
      const { accountIdentifier } = await resetPasswordService.getResetCode({ token: code })

      const accountService = createAccountService(accountIdentifier)
      const account = await accountService.findByIdentifier(accountIdentifier)
      return account
    }
  }
})
