import ms from 'ms'

import CacheSetting from 'models/cache-setting'

const defaultExpired = ms('90d') / 1000

const create = async (projectId) => {
  return await new CacheSetting({
    project: projectId,
    expired: defaultExpired
  }).save()
}

const remove = async (projectID) => {
  return CacheSetting.deleteMany({ project: projectID })
}

const get = async (projectId) => {
  return await CacheSetting.findOne({
    project: projectId
  }).lean()
}

const update = async (projectId, cacheSetting) => {
  return await CacheSetting.findOneAndUpdate({
    project: projectId
  }, cacheSetting, {
    new: true
  }).lean()
}

export default {
  create,
  get,
  remove,
  update
}
