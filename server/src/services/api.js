import request from 'superagent'

import config from 'infrastructure/config'

const joinParam = (params) => {
  return Object.entries(params)
    .map((entry) => entry[ 1 ] && entry.join('='))
    .filter(Boolean).join(',')
}

class ApiService {
  constructor(appIdentifier, accountIdentifier) {
    this.appIdentifier = appIdentifier
    this.accountIdentifier = accountIdentifier
  }

  async callApi(method, path, body) {
    const apiPath = config.apiUrl + path
    const authParams = joinParam({
      app: this.appIdentifier,
      account: this.accountIdentifier
    })

    const response = await request(method, apiPath)
      .set('Content-Type', 'application/json')
      .set('Authorization', `MEDIA_CDN ${ authParams }`)
      .send(body)

    return response.body
  }
}

export default ApiService
