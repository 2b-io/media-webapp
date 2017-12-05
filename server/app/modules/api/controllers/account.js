import {
  create as createAccount,
  list as listAllAccounts
} from 'services/account'

export function create(req, res, next) {
  const { email } = req.body

  createAccount({ email })
    .then(account => {
      res.status(201).json(account)
    })
    .catch(e => {
      res.status(500).json(e)
    })
}

export function list(req, res, next) {
  listAllAccounts()
    .then(accounts => {
      res.json(accounts)
    })
}
