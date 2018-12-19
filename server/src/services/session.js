import jwt from 'jsonwebtoken'
import ms from 'ms'

import config from 'infrastructure/config'
import createAccountService from 'services/account'

export const create = async ({ email, password }) => {
  const accountService = createAccountService()
  const account = await accountService.signIn({ email, password })

  if (!account) {
    throw new Error('Invalid email')
  }

  return issueJWT(account)
}

export const verify = async (token, { refresh } = { refresh: false }) => {
  const decoded = jwt.verify(token, config.session.secret)

  const accountService = createAccountService()
  const account = await accountService.get(decoded.identifier)

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
    identifier: account.identifier
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
