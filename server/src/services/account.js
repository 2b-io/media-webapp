import Account from 'models/Account'

export const list = async () => {
  return await Account.find().lean().exec()
}

export const create = async (info) => {
  // TODO generate randomize password
  // TODO send password via email

  const { email, password = '123456' } = info

  return await new Account({
    email,
    password
  }).save()
}

export const findById = async (id) => {
  return await Account.findById(id).lean()
}

export const findByEmail = async (email) => {
  return await Account.findOne({ email }).lean()
}
export const changePassword = async (currentPassword, newPassword, email) => {
  let password = newPassword
  let account = await Account.findOne({ email })
  if (!account) { return false }
  const checkPassword = await Account().comparePassword(currentPassword, account.hashedPassword)
  if (checkPassword == true) {
    account.password = password
    account.save()
    return true
  }
  return false

}
