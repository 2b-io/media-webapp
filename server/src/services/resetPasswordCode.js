import shorthash from 'shorthash'
import uuid from 'uuid'

import Account from 'models/Account'
import ResetPasswordCode from 'models/ResetPasswordCode'

export const requestRessetPassword = async (email) => {
  const account = await Account.findOne(email).lean()
  if (account) {
    let now = new Date()
    const { _id, removed } = account
    if (_id && !removed) {
      let code = shorthash.unique(uuid.v4())
      const dataExist = await ResetPasswordCode.findOne({ code }).lean()
      if (dataExist) {
        const { expired, used } = dataExist
        if (expired > now || used == false) {
          return true
        }
      }
      let dateExpired = now.getDate()+1
      let newExpired = new Date(now.setDate(dateExpired))
      await new ResetPasswordCode({
        code,
        uid: _id,
        expired: newExpired
      }).save()
      //to do send email (/code)
      return true
    }
  }
  return false
}
export const ressetPassword = async (password, code) => {
  let now = new Date()
  const dataExist = await ResetPasswordCode.findOne({ code }).lean()
  if (dataExist) {
    const { expired, used, uid } = dataExist
    if (!uid) { return false }
    if (expired > now || used == false ) {
      const account = await Account.findOneAndUpdate(
        { _id: uid },
        { password },
        { new: true }
      ).lean()
      let { ok } = await ResetPasswordCode.deleteOne({ code })
      return password === account.password && ok === 1 ? true : false
    }
  }
  return false
}
