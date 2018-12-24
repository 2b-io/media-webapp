import ApiService from 'services/api'

class ResetPasswordService extends ApiService {
  async forgotPassword(body) {
    return await this.callApi('post', '/reset-tokens', body)
  }

  async getResetCode({ token }) {
    return await this.callApi('get', `/reset-tokens/${ token }`)
  }
}

export default (account) => {
  return new ResetPasswordService('webapp', account)
}
