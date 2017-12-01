import jwt from 'jsonwebtoken'
import User from 'models/User'

const SECRET = 'xxx'

export function parseJWT(req, res, next) {
  const authorization = req.get('Authorization')

  if (!authorization) {
    return next()
  }

  const token = authorization.replace('Bearer ', '')

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return next()
    }

    const { _id } = decoded

    User
      .findById(_id)
      .lean()
      .then(user => {
        if (!user) {
          return next()
        }

        req._user = user

        next()
      })
      .catch(e => next())
  })
}
