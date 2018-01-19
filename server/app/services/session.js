import jwt from 'jsonwebtoken'
import ms from 'ms'

import config from 'infrastructure/config'
import { findById as findAccountById } from 'services/account'

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
  const account = await findAccountById(_id)

  if (!account) {
    throw new Error('Invalid or expired JWT')
  }

  return issueJWT(account)
}

export const verify = async (token) => {
  const decoded = jwt.verify(token, config.session.secret)

  const account = await findAccountById(decoded._id)

  if (!account) {
    throw new Error('Invalid or expired JWT')
  }

  return {
    token,
    ttl: ms(config.session.ttl),
    $meta: {
      account
    }
  }
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
    ttl: ms(config.session.ttl),
    $meta: {
      account
    }
  }
}
