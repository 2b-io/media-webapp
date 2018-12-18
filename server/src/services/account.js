import escapeStringRegexp from 'escape-string-regexp'

import Account from 'models/account'
import ApiService from 'services/api'

export const searchByEmail = async (email) => {
  if (!email) {
    throw new Error('Invaid parameter')
  }
  const escapeString = escapeStringRegexp(email)

  //regex to describes a pattern of character: matches beginning of email
  const emailRegex = new RegExp(`^${ escapeString }`)

  return await Account.find({ email: emailRegex })
}

//use new api

class AccountService extends ApiService {
  async changePassword(identifier, body) {
    await this.callApi('put', `/accounts/${ identifier }/password`, body)
    return true
  }

  async get(identifier) {
    return await this.callApi('get', `/accounts/${ identifier }`)
  }

  async create(body) {
    return await this.callApi('post', '/accounts', body)
  }

  async update(identifier, body) {
    return await this.callApi('patch', `/accounts/${ identifier }`, body)
  }
}

export default (account) => {
  return new AccountService('webapp', account)
}
