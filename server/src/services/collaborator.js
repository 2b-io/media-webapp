import ApiService from 'services/api'

class CollaboratorService extends ApiService {
  async list(projectIdentifier) {
    return await this.callApi('get', `/projects/${ projectIdentifier }/collaborators`)
  }

  async invite(projectIdentifier, body) {
    return await this.callApi('patch', `/projects/${ projectIdentifier }/collaborators`, body)
  }

  async remove(projectIdentifier, accountIdentifier) {
    return await this.callApi('delete', `/projects/${ projectIdentifier }/collaborators/${ accountIdentifier }`)
  }

  async makeOwner(projectIdentifier, accountIdentifier) {
    return await this.callApi('put', `/projects/${ projectIdentifier }/collaborators/${ accountIdentifier }`, {
      privilege: 'OWNER'
    })
  }
}

export default (accountIdentifier) => {
  return new CollaboratorService(accountIdentifier)
}
