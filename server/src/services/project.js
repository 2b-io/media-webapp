import Permission from 'models/Permission'
import Preset from 'models/Preset'
import Project from 'models/Project'

export const update = async ( slug, data ) => {
  
  const project = await Project.findOneAndUpdate(
    { slug }, { ...data },
    { new: true }
  ).lean()

  return project
}

export const getBySlug = async (slug) => {
  const project = await Project.findOne({
    slug,
    removed: false
  }).lean()

  return project
}
export const getById = async (id) => {

  const project = await Project.findOne({
    _id: id,
    removed: false
  }).lean()

  return project
}

export const list = async (account) => {
  if (!account) {
    throw new Error('Invaid parameter')
  }

  const permissions = await Permission.find({
    account
  }).lean()

  const projects = await Project.find({
    _id: {
      $in: permissions.map(p => p.project)
    },
    removed: false
  }).sort('slug').lean()

  return projects
}

export const create = async (data, account) => {
  const { name, slug, prettyOrigin, origins = [] } = data

  if (!name || !slug) {
    throw new Error('Invalid parameters')
  }

  try {
    const project = await new Project({
      name,
      slug,
      prettyOrigin,
      origins
    }).save()

    await new Permission({
      project: project._id,
      account: account._id,
      privilege: 'owner'
    }).save()

    await new Preset({
      project: project._id,
      name: 'default',
      isDefault: true
    }).save()

    return project
  } catch (error) {
    throw error
  }
}

export const remove = async (slug) => {
  const project = await Project.findOneAndUpdate({
    slug
  }, {
    removed: true
  }, {
    new: true
  })

  return project
}
