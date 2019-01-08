import ApiService from 'services/api'

class PresetService extends ApiService {
  async create(projectIdentifier, body) {
    return await this.callApi('post', `/projects/${ projectIdentifier }/presets`, body)
  }

  async list(projectIdentifier) {
    return await this.callApi('get', `/projects/${ projectIdentifier }/presets`)
  }

  async get(projectIdentifier, contentType) {
    return await this.callApi('get', `/projects/${ projectIdentifier }/presets/${ encodeURIComponent(contentType) }`)
  }

  async remove(projectIdentifier, contentType) {
    return await this.callApi('delete', `/projects/${ projectIdentifier }/presets/${ encodeURIComponent(contentType) }`)
  }

  async update(projectIdentifier, contentType, body) {
    return await this.callApi('put', `/projects/${ projectIdentifier }/presets/${ encodeURIComponent(contentType) }`, body)
  }
}

export default (accountIdentifier) => {
  return new PresetService(accountIdentifier)
}
