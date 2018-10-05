import Preset from 'models/Preset'

// import { invalidateAllCache } from 'services/project'

const defaultParameter = {
  'image/jpeg': {
    progressive: true,
    quality: 100
  },
  'image/gif': {
    optimize: '-O1'
  },
  'image/png': {
    quality: 100,
    speed: 3
  },
  'image/svg+xml': {
    cleanupAttrs: true,
    inlineStyles: false,
    removeDoctype: false,
    removeXMLProcInst: false,
    removeComments: true,
    removeEmptyAttrs: false,
    removeHiddenElems: false,
    removeEmptyText: true,
    removeEmptyContainers: true,
    minifyStyles: true,
    convertColors: true,
    convertPathData: true,
    convertTransform: true,
    removeUnknownsAndDefaults: true,
    removeUselessStrokeAndFill: true,
    cleanupNumericValues: true,
    collapseGroups: true,
    mergePaths: true,
    removeNonInheritableGroupAttrs: true,
    cleanupIDs: true,
    removeStyleElement: true
  }
}

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
  data.parameters = defaultParameter[ data.contentType ]

  const preset = await new Preset({
    ...data,
    project
  }).save()

  return preset
}

export const update = async (project, contentType, data) => {
  const { _id } = project
  // const { isActive } = data
  // if (!isActive) {
  //   await invalidateAllCache(identifier)
  // }
  const preset = await Preset.findOneAndUpdate(
    { project: _id, contentType },
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
