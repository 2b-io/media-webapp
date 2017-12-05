import jwt from 'jsonwebtoken'
import ms from 'ms'

import config from 'infrastructure/config'
import Account from 'models/Account'

export function create({ email, password }) {
  return Account.
    findOne({
      email
    })
    .lean()
    .then(account => {
      if (!account) {
        throw new Error('Invalid email')
      }

      return issueJWT(account)
    })
}

export function refresh({ _id }) {
  return Account
    .findById(_id)
    .lean()
    .then(account => {
      if (!account) {
        throw new Error('Invalid or expired JWT')
      }

      return issueJWT(account)
    })
}

export function issueJWT(account) {
  const payload = {
    _id: account._id
  }

  const token = jwt.sign(payload, config.session.secret, {
    expiresIn: config.session.ttl
  })

  return {
    token,
    ttl: ms(config.session.ttl)
  }
}
