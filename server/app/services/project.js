import Permission from 'models/Permission'
import Preset from 'models/Preset'
import Project from 'models/Project'

export const update = async (slug, data) => {
  const project = await Project.findOneAndUpdate(
    { slug },
    data,
    { new: true }
  )

  return project
}

export const getBySlug = async (slug) => {
  const project = await Project.findOne({ slug }).lean()

  return project
}

export const list = async (id) => {
  if (!id) {
    return await Project.find().lean()
  }

  const permissions = await Permission.find({
    account: id
  }).lean()

  const projects = await Project.find({
    _id: {
      $in: permissions.map(p => p.project)
    }
  }).sort('slug').lean()

  return projects
}

export const create = async (data, account) => {
  const { name, slug, origins = [] } = data

  if (!name || !slug) {
    throw new Error('Invalid parameters')
  }

  const project = await new Project({
    name,
    slug,
    origins
  }).save()

  const permission = await new Permission({
    project: project._id,
    account: account._id,
    privilege: 'owner'
  }).save()

  const preset = await new Preset({
    project: project._id,
    name: 'default',
    isDefault: true
  }).save()

  return project
}

export const destroy = async (slug) => {
  const project = await Project.findOneAndUpdate({
    slug: data.slug
  }, {
    destroyed: true
  }, {
    new: true
  })

  return project
}
