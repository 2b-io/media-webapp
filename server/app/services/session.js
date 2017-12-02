import jwt from 'jsonwebtoken'
import ms from 'ms'

import config from 'infrastructure/config'
import User from 'models/User'

export function create({ email, password }) {
  return User.
    findOne({
      email
    })
    .lean()
    .then(user => {
      if (!user) {
        throw new Error('Invalid email')
      }

      return issueJWT(user)
    })
}

export function refresh({ _id }) {
  return User
    .findById(_id)
    .lean()
    .then(user => {
      if (!user) {
        throw new Error('Invalid or expired JWT')
      }

      return issueJWT(user)
    })
}

export function issueJWT(user) {
  const payload = {
    _id: user._id
  }

  const token = jwt.sign(payload, config.session.secret, {
    expiresIn: config.session.ttl
  })

  return {
    token,
    ttl: ms(config.session.ttl)
  }
}
