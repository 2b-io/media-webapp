import CacheSetting from 'models/cache-setting'

export const get = async (project) => {
  return await CacheSetting.findOne({
    project
  }).lean()
}

export const update = async (project, data) => {
  return await CacheSetting.findOneAndUpdate(
    { project },
    { ...data },
    { new: true }
  ).lean()
}
