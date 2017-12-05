import {
  create as createSession,
  refresh as refreshSession
} from 'services/session'

export function create(req, res, next) {
  const { refresh, email, password } = req.body
  let make

  if (refresh && req._account) {
    make = refreshSession({ _id: req._account._id })
  } else {
    make = createSession({ email, password })
  }

  make
    .then(session => res.json(session))
    .catch(e => next(e))
}

export function verify(req, res, next) {
  const { _account } = req

  res.sendStatus(_account ? 200 : 401)
}
