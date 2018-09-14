import PullSetting from 'models/Pull-setting'

export const get = async (project) => {
  return await PullSetting.findOne({
    project
  }).lean()
}

export const update = async (project) => {
  return await PullSetting.findOne({
    project
  }).lean()
}
