import Preset from 'models/Preset'

export const list = async (project) => {
  const presets = await Preset.find({
    project: project._id,
    removed: false
  }).sort('-isDefault hash').lean()

  return presets
}

export const get = async (project, hash) => {
  const preset = await Preset.findOne({
    project: project._id,
    hash: hash,
    removed: false
  }).lean()

  return preset
}

export const create = async (project, data) => {
  const preset = await new Preset({
    ...data,
    project: project._id,
    isDefault: false
  }).save()

  return preset
}

export const update = async (project, hash, data) => {
  const preset = await Preset.findOneAndUpdate(
    { project: project._id, hash },
    data,
    { new: true }
  ).lean()

  return preset
}

export const remove = async (project, hash) => {
  const preset = await Preset.findOneAndUpdate(
    { project: project._id, hash },
    { removed: true },
    { new: true }
  ).lean()

  return preset
}
