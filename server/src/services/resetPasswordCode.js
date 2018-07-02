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
      const dataExist = await ResetPasswordCode.findOne({ uid: _id }).lean()
      if (dataExist) {
        const { used, uid } = dataExist
        if (used == false && _id == uid) {
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
  const userInfo = await ResetPasswordCode.findOne({ code }).lean()
  if (userInfo) {
    const { used, uid } = userInfo
    if (!uid) { return false }
    if ( used === false ) {
      const account = await Account.findOne(
        { _id: uid }
      )
      account.password = password
      account.save()
      const { ok } = await ResetPasswordCode.deleteOne({ code })
      return ok === 1 ? true : false
    }
  }
  return false
}
