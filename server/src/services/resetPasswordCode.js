import sha256 from 'sha256'
import crypto from 'crypto-js'

import Account from 'models/Account'
import ResetPasswordCode from 'models/ResetPasswordCode'

export const requestRessetPassword = async (email) => {
  const account = await Account.findOne(email).lean()
  if (account) {
    let now = new Date()
    const { _id, removed } = account
    if (_id && !removed) {
      const code = sha256(String(_id))
      // const cryp = crypto.AES.encrypt(String(_id), code).toString()
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
        expired: newExpired
      }).save()
      //to do send email (/code/cryp)
      return true
    }
  }
  return false
}
export const ressetPassword = async (password, code, cryp) => {
  let now = new Date()
  const dataExist = await ResetPasswordCode.findOne({ code }).lean()
  if (dataExist) {
    const { expired, used } = dataExist
    const deCode = crypto.AES.decrypt(cryp, code.toString())
    const id = deCode.toString(crypto.enc.Utf8)
    if (!id) { return false }
    if (expired > now || used == false ) {
      const account = await Account.findOneAndUpdate(
        { _id: id },
        { password },
        { new: true }
      ).lean()
      return password === account.password ? true : false
    }
  }
  return false
}
