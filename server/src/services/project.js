import ApiService from 'services/api'

class ProjectService extends ApiService {
  async create(body) {
    return await this.callApi('post', '/projects', body)
  }

  async list() {
    return await this.callApi('get', '/projects')
  }

  async get(projectIdentifier) {
    return await this.callApi('get', `/projects/${ projectIdentifier }`)
  }

  async remove(projectIdentifier) {
    return await this.callApi('delete', `/projects/${ projectIdentifier }`)
  }

  async update(projectIdentifier, body) {
    return await this.callApi('patch', `/projects/${ projectIdentifier }`, body)
  }
}

export default (accountIdentifier) => {
  return new ProjectService('webapp', accountIdentifier)
}
