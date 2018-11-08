import PinProject from 'models/pin-project'

const get = async (account) => {
  return await PinProject.findOne({
    account
  }).lean()
}

const update = async (account, project) => {
  return await PinProject.findOneAndUpdate(
    { account },
    { project },
    { new: true, upsert: true }
  ).lean()
}

export default {
  get,
  update
}
