import Account from 'models/Account'

export function list() {
  return Account.find().lean().exec()
}

export function create(info) {
  const { email } = info
  // TODO generate randomize password
  const password = '123456'

  const account = new Account({
    email,
    password
  })

  return account.save()
}
