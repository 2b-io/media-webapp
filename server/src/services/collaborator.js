import ApiService from 'services/api'

class CollaboratorService extends ApiService {
  async list(projectIdentifier) {
    return await this.callApi('get', `/projects/${ projectIdentifier }/collaborators`)
  }
}

export default (accountIdentifier) => {
  return new CollaboratorService('webapp', accountIdentifier)
}
