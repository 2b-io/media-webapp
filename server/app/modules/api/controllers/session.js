import {
  create as createSession
} from 'services/session'

export function create(req, res, next) {
  const { email, password } = req.body

  createSession({
    email,
    password
  })
  .then(session => res.json(session))
  .catch(e => next(e))
}
