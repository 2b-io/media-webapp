import jwt from 'jsonwebtoken'
import ms from 'ms'

import config from 'infrastructure/config'
import Account from 'models/Account'

export const create = async ({ email, password }) => {
  const account = await Account.findOne({
    email
  }).lean()

  if (!account) {
    throw new Error('Invalid email')
  }

  return issueJWT(account)
}

export const refresh = async ({ _id }) => {
  const account = await Account.findById(_id).lean()

  if (!account) {
    throw new Error('Invalid or expired JWT')
  }

  return issueJWT(account)
}

export const issueJWT = (account) => {
  const payload = {
    _id: account._id
  }

  const token = jwt.sign(payload, config.session.secret, {
    expiresIn: config.session.ttl
  })

  return {
    token,
    account: account,
    ttl: ms(config.session.ttl)
  }
}
