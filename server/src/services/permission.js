import Permission from 'models/Permission'
import {
  findByIdentifier as findAccountByIdenfier
} from 'services/account'

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
    privilege: 'ADMIN'
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

export const remove = async (projectId, accountIdentifier) => {
  const account = await findAccountByIdenfier(accountIdentifier)

  return await Permission.deleteOne({
    project: projectId,
    account: account._id
  })
}

export const makeOwner = async (project, { accountId }) => {
  const currentAccountId = project.account._id

  const nextOwner = await findAccountByIdenfier(accountId)

  await updatePermission(project._id, currentAccountId, 'ADMIN')

  try {
    await updatePermission(project._id, nextOwner._id, 'OWNER')
  } catch (error) {
    await updatePermission(project._id, currentAccountId, 'OWNER')

    throw error
  }
}
