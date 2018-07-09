import Permission from 'models/Permission'

export const get = async (project) => {
  const permission = await Permission.findOne({
    project: project._id
  }).lean()

  return permission
}

export const list = async (project) => {
  const permissions = await Permission.find({
    project: project._id
  }).lean()

  return permissions
}
