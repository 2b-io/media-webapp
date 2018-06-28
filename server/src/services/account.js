import Account from 'models/Account'

export const list = async () => {
  return await Account.find().lean().exec()
}

export const create = async (info) => {
  // TODO generate randomize password
  // TODO send password via email

  const { email, password } = info

  return await new Account({
    email,
    passwordHash: password
  }).save()
}

export const findById = async (id) => {
  return await Account.findById(id).lean()
}

export const findByEmail = async (email) => {
  return await Account.findOne({ email }).lean()
}
