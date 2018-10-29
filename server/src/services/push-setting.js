import PushSetting from 'models/push-setting'

export const get = async (project) => {
  return await PushSetting.findOne({
    project
  }).lean()
}

export const create = async (project, data) => {
  return await new PushSetting({
    ...data,
    project
  }).save()
}

export const update = async (project, data) => {
  return await PushSetting.findOneAndUpdate(
    { project },
    { ...data },
    { new: true }
  ).lean()
}

export const remove = async (project) => {
  return await PushSetting.findOneAndRemove(
    { project }
  )
}
