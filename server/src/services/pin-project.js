import PinProject from 'models/pin-project'

const get = async (account) => {
  return await PinProject.findOne({
    account
  }).lean()
}

const update = async (account, projects) => {
  return await PinProject.findOneAndUpdate(
    { account },
    { projects },
    { new: true, upsert: true }
  ).lean()
}

export default {
  get,
  update
}
