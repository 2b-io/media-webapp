import uuidv5 from 'uuid'

import Account from 'models/Account'
import ResetPasswordCode from 'models/ResetPasswordCode'

export const requestRessetPassword = async (email) => {
  const account = await Account.findOne( email ).lean()
  if (account) {
    let { _id,removed } = account
    if (_id && !removed) {
      let code = uuidv5(_id)
      let now = new Date()
      let dateExpired = now.getDate()+1
      let expired = new Date(now.setDate(dateExpired))
      await new ResetPasswordCode({
        code,
        expired
      }).save()
      return true
    }
  }
  return false
}
