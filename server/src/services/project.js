import namor from 'namor'

import Preset from 'models/Preset'
import Project from 'models/Project'
import PullSetting from 'models/pull-setting'
import SecretKey from 'models/secret-key'

//import cacheSettingService from 'services/cache-setting'
import infrastructureService from 'services/infrastructure'
import invalidationService from 'services/invalidation'
import ApiService from 'services/api'

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
    await infrastructureService.createInfraJob(projectId)
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
}

export const getByID = async (id) => {
  return await Project.findOne({
    _id: id
  }).lean()
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
    infrastructureService.remove(_id),
    invalidationService.create(project.identifier, [ '/*' ])
  ])

  return true
}

export const invalidateCache = async (projectIdentifier, patterns = []) => {
  return await invalidationService.create(projectIdentifier, patterns)
}

// export default {
//   create,
//   get,
//   getByID,
//   invalidateCache,
//   list,
//   remove,
//   update
// }

class ProjectService extends ApiService {
  async create(body) {
    return await this.callApi('post', '/projects', body)
  }

  async list() {
    return await this.callApi('get', '/projects')
  }

  async get(projectIdentifier) {
    return await this.callApi('get', `/projects/${ projectIdentifier }`)
  }

  async remove(projectIdentifier) {
    return await this.callApi('delete', `/projects/${ projectIdentifier }`)
  }

  async update(projectIdentifier, body) {
    return await this.callApi('patch', `/projects/${ projectIdentifier }`, body)
  }
}

export default (accountIdentifier) => {
  return new ProjectService('webapp', accountIdentifier)
}
