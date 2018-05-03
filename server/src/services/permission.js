import Permission from 'models/Permission'

export const get = async (account, project) => {
  const permission = await Permission.findOne({
    account: account._id,
    project: project._id
  })

  return permission
}
