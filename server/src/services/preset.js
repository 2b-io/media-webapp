import Preset from 'models/Preset'

const DEFAULT_PARAMETERS = {
  'image/jpeg': {
    progressive: true,
    quality: 90
  },
  'image/gif': {
    optimize: '-O1'
  },
  'image/png': {
    minQuality: 65,
    maxQuality: 80,
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
  return await Preset.find({
    project
  }).lean()
}

export const get = async (projectId, contentType) => {
  const preset = await Preset.findOne({
    project: projectId,
    contentType
  }).lean()

  if (!preset.parameters) {
    return { ...preset, parameters: {} }
  }

  return preset
}

export const create = async (projectId, data) => {
  return await new Preset({
    project: projectId,
    ...data,
    parameters: DEFAULT_PARAMETERS[ data.contentType ]
  }).save()
}

export const update = async (project, contentType, data) => {
  return await Preset.findOneAndUpdate({
    project: project._id,
    contentType
  }, data, {
    new: true
  }).lean()
}

export const remove = async (projectId, contentType) => {
  return await Preset.findOneAndRemove({
    project: projectId,
    contentType
  })
}
