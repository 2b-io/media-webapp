import request from 'superagent'

import config from 'infrastructure/config'

class ApiService {
  constructor(appIdentifier, accountIdentifier) {
    this.appIdentifier = appIdentifier
    this.accountIdentifier = accountIdentifier
  }

  async callApi(method, path, body) {
    const apiPath = config.apiServer + path

    const response = await request(method, apiPath)
      .set('Content-Type', 'application/json')
      .set('Authorization', `MEDIA_CDN app=${ this.appIdentifier },account=${ this.accountIdentifier }`)
      .send(body)

    return response.body
  }
}

export default ApiService
