import jwt from 'jsonwebtoken'
import ms from 'ms'

import Account from 'models/Account'
import config from 'infrastructure/config'
import {
  findByEmail as findByAccountEmail,
  findById as findAccountById
} from 'services/account'

export const create = async ({ email, password }) => {
  const account = await findByAccountEmail(email)

  if (!account) {
    throw new Error('Invalid email')
  }

  const { hashedPassword } = account
  return await Account().comparePassword(password, hashedPassword) ? issueJWT(account) : null
}

export const verify = async (token, { refresh } = { refresh: false }) => {
  const decoded = jwt.verify(token, config.session.secret)

  const account = await findAccountById(decoded._id)

  if (!account) {
    throw new Error('Invalid or expired JWT')
  }

  return refresh ? issueJWT(account) : {
    token,
    ttl: ms(config.session.ttl),
    account
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
    account
  }
}
