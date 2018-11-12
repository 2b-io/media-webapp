import PinnedProject from 'models/pinned-project'

const list = async (accountID) => {
  const pinnedProjects = await PinnedProject.findOne({
    account: accountID
  }).lean()
  return pinnedProjects
}

const update = async (accountID, projectIdentifiers) => {
  const { projects } = await PinnedProject.findOneAndUpdate(
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
