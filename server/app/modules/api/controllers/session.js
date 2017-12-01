import {
  create as createSession,
  refresh as refreshSession
} from 'services/session'

export function create(req, res, next) {
  const { refresh, email, password } = req.body
  let make

  if (refresh && req._user) {
    make = refreshSession({ _id: req._user._id })
  } else {
    make = createSession({ email, password })
  }

  make
    .then(session => res.json(session))
    .catch(e => next(e))
}

export function verify(req, res, next) {
  const { _user } = req

  res.sendStatus(_user ? 200 : 401)
}
