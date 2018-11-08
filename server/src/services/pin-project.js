import PinProject from 'models/pin-project'

const get = async (account) => {
  return await PinProject.findOne({
    account
  }).lean()
}

const update = async (account, projects) => {
  const updatePinnedProjects = await PinProject.findOneAndUpdate(
    { account },
    { projects },
    { new: true, upsert: true }
  ).lean()

  if (updatePinnedProjects) {
    return await PinProject.findOne({
      account
    }).lean()
  } else {
    return []
  }
}

export default {
  get,
  update
}
