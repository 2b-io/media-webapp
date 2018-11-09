import PinProject from 'models/pin-project'

const list = async (accountID) => {
  const { projects } = await PinProject.findOne({
    account: accountID
  }).lean()
  return projects
}

const update = async (accountID, projectIdentifiers) => {
  const { projects } = await PinProject.findOneAndUpdate(
    { account: accountID },
    { projects: projectIdentifiers },
    { new: true, upsert: true }
  ).lean()

  return projects
}

export default {
  list,
  update
}
