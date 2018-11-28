import Account, { hashPassword } from 'models/Account'
import ResetPasswordCode from 'models/Reset-password-code'
import {
  // findById as findAccountById,
  update as updateAccount
} from 'services/account'
import ApiService from 'services/api'

export const resetPassword = async ({ name, password }, code) => {
  const { uid } = await ResetPasswordCode.findOne({
    code,
    used: false
  }).lean()

  await updateAccount(uid, {
    name,
    hashedPassword: hashPassword(password),
    isActive: true
  })

  await ResetPasswordCode.deleteOne({ code })

  return true
}

class ResetPasswordService extends ApiService {
  async forgotPassword(body) {
    const account = await Account.findOne({ email: body.email }).lean()

    if (!account) {
      return null
    }

    const { _id, removed } = account

    if (!_id && removed) {
      return null
    }

    return await this.callApi('post', '/reset-tokens', body)
  }

  async getResetCode({ token }) {
    return await this.callApi('get', `/reset-tokens/${ token }`)
  }
}

export default (account) => {
  return new ResetPasswordService('webapp', account)
}
