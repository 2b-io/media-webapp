import config from 'infrastructure/config'
import ApiServices from 'services/api'

class InfrastructureJobService extends ApiServices {
  async create(projectIdentifier) {
    const body = {
      name: 'CHECK_INFRASTRUCTURE',
      when: Date.now(),
      payload: {
        projectIdentifier
      }
    }

    return await this.callApi('post', `${ config.apiUrl }/jobs`, body)
  }
}

export default (accountIdentifier) => {
  return new InfrastructureJobService('webapp', accountIdentifier)
}
