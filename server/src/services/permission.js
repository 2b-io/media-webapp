import Permission from 'models/Permission'
import { findByEmail as findAccountByEmail } from 'services/account'

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

export const invite = async (project, email) => {
  const account = await findAccountByEmail(email)
  const permission = await new Permission({
    project: project._id,
    account: account._id,
    privilege: 'owner'
  }).save()

  return permission
}
