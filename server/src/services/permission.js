import Permission from 'models/Permission'

export const get = async (project) => {
  const permission = await Permission.findOne({
    project: project._id
  })

  return permission
}
