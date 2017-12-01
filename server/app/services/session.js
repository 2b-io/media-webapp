import jwt from 'jsonwebtoken'
import ms from 'ms'
import User from 'models/User'

const SECRET = 'xxx'
const TTL = ms('1h')

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

  const token = jwt.sign(payload, SECRET, {
    expiresIn: TTL
  })

  return {
    token,
    ttl: TTL
  }
}
