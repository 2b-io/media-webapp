import ApiService from 'services/api'

//import ms from 'ms'
//import CacheSetting from 'models/cache-setting'

// const DEFAULT_CACHE_SETTING = {
//   ttl: ms('90d') / 1000
// }

// const create = async (projectId) => {
//   return await new CacheSetting({
//     project: projectId,
//     ...DEFAULT_CACHE_SETTING
//   }).save()
// }

// const remove = async (projectId) => {
//   return CacheSetting.deleteMany({
//     project: projectId
//   })
// }

// const get = async (projectId) => {
//   return await CacheSetting.findOne({
//     project: projectId
//   }).lean()
// }

// const update = async (projectId, cacheSetting) => {
//   return await CacheSetting.findOneAndUpdate({
//     project: projectId
//   }, cacheSetting, {
//     new: true
//   }).lean()
// }

class CacheSettingService extends ApiService {
  async get(projectIdentifier) {
    return await this.callApi('get', `/projects/${ projectIdentifier }/cache-setting`)
  }

  async update(projectIdentifier, body) {
    return await this.callApi('put', `/projects/${ projectIdentifier }/cache-setting`, body)
  }
}

export default (accountIdentifier) => {
  return new CacheSettingService('webapp', accountIdentifier)
}
