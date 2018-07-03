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
  return await Account.findById(id)
}

export const findByEmail = async (email) => {
  return await Account.findOne({ email })
}

export const changePassword = async (_id, currentPassword, newPassword) => {
  const account = await Account.findOne({ _id })

  if (!account.comparePassword(currentPassword)) {
    throw new Error('Incorrect Password')
  }

  account.password = newPassword
  await account.save()

  return true
}
