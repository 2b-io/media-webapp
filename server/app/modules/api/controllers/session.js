import param from 'middlewares/param'
import {
  create as createSession,
  refresh as refreshSession
} from 'services/session'

export const create = [
  param({
    name: 'session',
    required: false
  }),
  (req, res, next) => {
    const { session } = req._params
    const { refresh, email, password } = req.body

    let make

    if (refresh && session) {
      make = refreshSession({ _id: session._id })
    } else if (email) {
      make = createSession({ email, password })
    } else {
      return res.sendStatus(400)
    }

    make
      .then(session => res.json(session))
      .catch(e => next(e))
  }
]

export const verify = [
  param('session'),
  (req, res, next) => {
    const { session } = req._params

    res.sendStatus(session ? 200 : 401)
  }
]
