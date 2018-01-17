import Preset from 'models/Preset'

export const list = async (project) => {
  const presets = await Preset.find({
    project: project._id
  }).lean()

  return presets
}

export const get = async (project, hash) => {
  const preset = await Preset.findOne({
    project: project._id,
    hash: hash
  }).lean()

  return preset
}
