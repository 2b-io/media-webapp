import Preset from 'models/Preset'

export const list = async (project) => {
  const presets = await Preset.find({
    project
  }).lean()

  return presets
}

export const get = async (project, contentType) => {
  const preset = await Preset.findOne({
    contentType,
    project
  }).lean()
  
  if (!preset.parameters) {
    return { ...preset, parameters: {} }
  }
  return preset
}

export const create = async (project, data) => {
  const preset = await new Preset({
    ...data,
    project
  }).save()

  return preset
}

export const update = async (project, contentType, data) => {
  const preset = await Preset.findOneAndUpdate(
    { project, contentType },
    data,
    { new: true }
  ).lean()

  return preset
}

export const remove = async (project, contentType) => {
  const preset = await Preset.findOneAndRemove(
    { project, contentType }
  )

  return preset
}
