import Account from 'models/Account'

export function list() {
  return Account.find().lean().exec()
}

export function create(info) {
  // TODO generate randomize password
  // TODO send password via email

  const { email } = info
  const password = '123456'

  const account = new Account({
    email,
    password
  })

  return account.save()
}
