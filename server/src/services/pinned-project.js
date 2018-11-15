import PinnedProject from 'models/pinned-project'

const list = async (accountID) => {
  const data = await PinnedProject.findOne({
    account: accountID
  }).lean()

  if (!data) {
    return []
  }

  return data.projects
}

const update = async (accountID, projectIdentifiers) => {
  const { projects } = await PinnedProject.findOneAndUpdate({
    account: accountID
  }, {
    projects: projectIdentifiers
  },{
    new: true,
    upsert: true
  }).lean()

  return projects
}

export default {
  list,
  update
}
