// import sh from 'shorthash'
// import uniqid from 'uniqid'

// import SecretKey from 'models/secret-key'

// export const list = async (project) => {
//   return await SecretKey.find({
//     project
//   }).lean()
// }
// export const get = async (project, key) => {
//   return await SecretKey.findOne({
//     key,
//     project
//   }).lean()
// }

// export const create = async (project) => {
//   const shortProjectId = sh.unique(String(project))
//   const key = uniqid(`${ shortProjectId }-`)
//   return await new SecretKey({
//     key,
//     project
//   }).save()
// }

// export const update = async (project, key, data) => {
//   return await SecretKey.findOneAndUpdate(
//     { project, key },
//     data,
//     { new: true }
//   ).lean()
// }

// export const remove = async (project, key) => {
//   return await SecretKey.findOneAndRemove(
//     { project, key }
//   )
// }
