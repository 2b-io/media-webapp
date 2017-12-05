import jwt from 'jsonwebtoken'
import Account from 'models/Account'

import config from 'infrastructure/config'

export function parseJWT(req, res, next) {
  const authorization = req.get('Authorization')

  if (!authorization) {
    return next()
  }

  const token = authorization.replace('Bearer ', '')

  jwt.verify(token, config.session.secret, (err, decoded) => {
    if (err) {
      return next()
    }

    const { _id } = decoded

    Account
      .findById(_id)
      .lean()
      .then(account => {
        if (!account) {
          return next()
        }

        req._account = account

        next()
      })
      .catch(e => next())
  })
}
