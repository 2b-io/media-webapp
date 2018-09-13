import PullSetting from 'models/PullSetting'

export const get = async (project) => {
  return await PullSetting.findOne({
    project
  }).lean()
}

export const remove = async (project) => {
  return await PullSetting.findOneAndRemove(
    { project }
  )
}
