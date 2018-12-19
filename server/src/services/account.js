import ApiService from 'services/api'

class AccountService extends ApiService {
  async changePassword(identifier, body) {
    await this.callApi('put', `/accounts/${ identifier }/password`, body)
    return true
  }

  async signIn({ email, password }) {
    const emailEncoded = encodeURIComponent(email)
    const passwordEncoded = Buffer.from(encodeURIComponent(password)).toString('base64')
    const accounts = await this.callApi('get', `/accounts?email=${ emailEncoded }&password=${ passwordEncoded }`)

    return accounts[ 0 ]
  }

  async list({ email }) {
    return await this.callApi('get', `/accounts?email=${ encodeURIComponent(email) }`)
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
