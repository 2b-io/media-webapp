import ApiService from 'services/api'

class PinnedProjectService extends ApiService {
  async list (accountIdentifier) {
    return await this.callApi(
      'get',
      `/accounts/${ accountIdentifier }/pinned-projects`
    )
  }

  async update (accountIdentifier, projectIdentifiers) {
    return await this.callApi(
      'put',
      `/accounts/${ accountIdentifier }/pinned-projects`,
      { projectIdentifiers }
    )
  }
}

export default (accountIdentifier) => {
  return new PinnedProjectService('webapp', accountIdentifier)
}
