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
export const makeOwner = async (project, { currentUId, nextUId }) => {

  const changeToAdmin = await Permission.findOneAndUpdate( {
    project: project._id,
    account: currentUId
  }, {
    privilege: 'admin'
  }).lean()

  const changeToOwner = await Permission.findOneAndUpdate( {
    project: project._id,
    account: nextUId
  }, {
    privilege: 'owner'
  }).lean()

  return (changeToAdmin && changeToOwner) ? true : false
}
