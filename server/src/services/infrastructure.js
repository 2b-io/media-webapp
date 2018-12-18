import ApiServices from 'services/api'

class InfrastructureService extends ApiServices {
  async get(projectIdentifier) {
    return await this.callApi('get', `/projects/${ projectIdentifier }/infrastructure`)
  }

  async update(projectIdentifier, body) {
    return await this.callApi('patch', `/projects/${ projectIdentifier }/infrastructure`, body)
  }
}

export default (accountIdentifier) => {
  return new InfrastructureService('webapp', accountIdentifier)
}
