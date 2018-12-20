import jwt from 'jsonwebtoken'
import ms from 'ms'

import config from 'infrastructure/config'
import createAccountService from 'services/account'
import ApiService from 'services/api'

class SessionService extends ApiService {
  issueJWT(account) {
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

  async verify(token, { refresh } = { refresh: false }) {
    const decoded = jwt.verify(token, config.session.secret)

    const accountService = createAccountService()
    const account = await accountService.get(decoded.identifier)

    if (!account) {
      throw new Error('Invalid or expired JWT')
    }

    return refresh ? this.issueJWT(account) : {
      token,
      ttl: ms(config.session.ttl),
      account
    }
  }

  async create({ email, password }) {
    const sessionAccount = await this.callApi('post', '/sessions', { email, password })

    if (!sessionAccount) {
      throw new Error('Invalid email')
    }

    return this.issueJWT(sessionAccount)
  }

}

export default () => {
  return new SessionService('webapp')
}
