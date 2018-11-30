import namor from 'namor'

import Permission from 'models/Permission'
import Preset from 'models/Preset'
import Project from 'models/Project'
import PullSetting from 'models/pull-setting'
import SecretKey from 'models/secret-key'

//import cacheSettingService from 'services/cache-setting'
import infrastructureService from 'services/infrastructure'
import createInfrastructureJobService from 'services/infrastructure-job'
import invalidationService from 'services/invalidation'

const generateUniqueIdentifier = async (retry) => {
  const identifier = namor.generate({
    words: 2,
    numbers: 2,
    manly: true
  })

  // check collision
  const project = await Project.findOne({
    identifier
  }).lean()

  if (!project) {
    return identifier
  }

  // should retry?
  if (!retry) {
    throw 'Cannot create unique identifier'
  }

  // retry
  return await generateUniqueIdentifier(retry - 1)
}

export const update = async (condition, account, { isActive, name }) => {
  const {
    _id: projectId,
    status: currentStatus,
    isActive: currentIsActive,
  } = await get(condition, account)

  const needUpdateDistribution = currentIsActive !== isActive

  if (needUpdateDistribution) {
    await infrastructureService.update(projectId, {
      enabled: isActive
    })
    await createInfrastructureJobService(projectId)
  }

  return await Project.findByIdAndUpdate(projectId, {
    name,
    isActive,
    status: needUpdateDistribution ?
      'UPDATING' : currentStatus
  }, {
    new: true
  })
}

export const get = async (condition, account) => {
  const project = await Project.findOne(condition).lean()

  if (!project) {
    return null
  }

  //  check permission
  const permission = await Permission.findOne({
    account,
    project: {
      $eq: project._id
    }
  }).lean()

  if (!permission) {
    throw 'Forbidden'
  }

  return project
}

export const getByID = async (id) => {
  return await Project.findOne({
    _id: id
  }).lean()
}

export const list = async (accountID, condition = {}) => {
  if (!accountID) {
    throw 'Invaid parameters: Missing [accountID]'
  }

  const permissions = await Permission.find({
    account: accountID
  }).lean()

  const projects = await Promise.all(
    permissions.map(
      async (permission) => await get({
        _id: permission.project,
        ...condition
      }, permission.account)
    )
  )

  return projects.filter(Boolean)
}

export const create = async ({ name }, provider, account) => {
  if (!name) {
    throw 'Invalid parameters: Missing [name]'
  }

  if (provider !== 'cloudfront') {
    throw 'Invalid parameters: Not support [provider] value'
  }

  // retry 10 times
  const identifier = await generateUniqueIdentifier(10)

  const project = await new Project({
    name,
    identifier,
    status: 'INITIALIZING'
  }).save()

  try {
    await new Permission({
      project: project._id,
      account: account._id,
      privilege: 'owner'
    }).save()

    await new PullSetting({
      project: project._id
    }).save()

    //await cacheSettingService.create(project._id)
    await infrastructureService.create(project, provider)
    await createInfrastructureJobService(project.identifier)

    return project
  } catch (error) {
    await Project.findOneAndRemove({ _id: project._id })
    await Permission.deleteMany({ project: project._id })
    await PullSetting.deleteMany({ project: project._id })
    //await cacheSettingService.remove(project._id)

    throw error
  }
}

export const remove = async (condition, account) => {
  const project = await get(condition, account)

  if (!project) {
    throw 'Project not found'
  }

  const { _id, isActive } = project

  if (isActive) {
    throw 'Cannot remove enabled project'
  }

  await Project.findOneAndRemove({ _id })

  await Promise.all([
    //cacheSettingService.remove(_id),
    Preset.deleteMany({ project: _id }),
    PullSetting.deleteMany({ project: _id }),
    SecretKey.deleteMany({ project: _id }),
    Permission.deleteMany({ project: _id }),
    infrastructureService.remove(_id),
    invalidationService.create(project.identifier, [ '/*' ])
  ])

  return true
}

export const invalidateCache = async (projectIdentifier, patterns = []) => {
  return await invalidationService.create(projectIdentifier, patterns)
}

export default {
  create,
  get,
  getByID,
  invalidateCache,
  list,
  remove,
  update
}
