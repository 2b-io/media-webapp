import Bluebird from 'bluebird'
import Permission from 'models/Permission'
import Project from 'models/Project'

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
  }).lean()

  return projects
}

export const create = async (data, account) => {
  const { name, slug, origins = [] } = data

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

  return project
}
