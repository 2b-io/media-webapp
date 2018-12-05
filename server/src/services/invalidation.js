import ApiService from 'services/api'

class InvalidationService extends ApiService {
  async create(projectIdentifier, body) {
    return await this.callApi('post', `/projects/${ projectIdentifier }/invalidations`, body)
  }

  async list(projectIdentifier) {
    return await this.callApi('get', `/projects/${ projectIdentifier }/invalidations`)
  }
}

export default (accountIdentifier) => {
  return new InvalidationService('webapp', accountIdentifier)
}
