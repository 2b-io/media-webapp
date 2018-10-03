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

export const invite = async (project, account) => {
  return new Permission({
    project: project._id,
    account: account._id,
    privilege: 'admin'
  }).save()
}

const updatePermission = async (project, account, permission) => {
  return await Permission.findOneAndUpdate( {
    project,
    account
  }, {
    privilege: permission
  }).lean()
}

export const remove = async (_id, accountId) => {
  return await Permission.deleteOne({
    project: _id,
    account: accountId
  })
}

export const makeOwner = async (project, { accountId }) => {
  const currentAccountId = project.account._id
  const admin = await updatePermission(project._id, currentAccountId, 'admin')
  if (admin) {
    const owner = await updatePermission(project._id, accountId, 'owner')
    if (!owner) {
      await updatePermission(project._id, currentAccountId, 'admin')
      return false
    }
    return true
  }
  return false
}
