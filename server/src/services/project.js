import request from 'superagent'
import { URL } from 'url'

import config from 'infrastructure/config'
import Infrastructure from 'models/Infrastructure'
import { createDistribution, getDistribution, updateDistribution } from 'services/cloudFront'
import Permission from 'models/Permission'
import PullSetting from 'models/pull-setting'
import SecretKey from 'models/secret-key'
import Preset from 'models/Preset'
import Project from 'models/Project'

const normalizePattern = (path, origin) => {
  try {
    return new URL(path, origin || undefined).toString()
  } catch (e) {
    return null
  }
}

export const update = async (projectIdentifier, { isActive, name }) => {
  const {
    _id,
    status: currentStatus,
    isActive: currentIsActive,
  } = await Project.findOne({
    identifier: projectIdentifier
  }).lean()

  const needUpdateDistribution = currentIsActive !== isActive

  if (needUpdateDistribution) {
    const { identifier: distributionId } = await Infrastructure.findOne({ project: _id })

    await updateDistribution(distributionId, {
      enabled: isActive
    })
  }

  return await Project.findByIdAndUpdate(_id, {
    name,
    isActive,
    status: needUpdateDistribution ? 'UPDATING' : currentStatus
  }, {
    new: true
  })
}

export const getByIdentifier = async (projectIdentifier, account) => {
  const project = await Project.findOne({
    identifier: projectIdentifier
  }).lean()

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

  const { status: projectStatus } = project

  if (projectStatus === 'INITIALIZING' || projectStatus === 'UPDATING') {
    const { identifier: distributionId } = await Infrastructure.findOne({ project: project._id })
    const { Distribution: distribution } = await getDistribution(distributionId)
    const { Status: distributionStatus, DistributionConfig } = distribution
    const isActive = DistributionConfig.Enabled
    const status = (distributionStatus === 'InProgress') ?
      projectStatus === 'INITIALIZING' ? 'INITIALIZING' : 'UPDATING' :
      distributionStatus.toUpperCase()

    return await Project.findOneAndUpdate(
      { identifier: projectIdentifier },
      { status, isActive },
      { new: true }
    ).lean()
  }

  return project
}
export const getById = async (id) => {
  return await Project.findOne({
    _id: id
  }).lean()
}

export const list = async (account) => {
  if (!account) {
    throw new Error('Invaid parameter')
  }

  const permissions = await Permission.find({
    account
  }).lean()

  const projects = await Project.find({
    _id: {
      $in: permissions.map(p => p.project)
    }
  })

  return projects
}

export const create = async (data, provider, account) => {
  const { name, description } = data
  if (!name) {
    throw new Error('Invalid parameters')
  }
  const project = await new Project({
    name,
    description,
    status: 'INITIALIZING'
  }).save()

  await new Permission({
    project: project._id,
    account: account._id,
    privilege: 'owner'
  }).save()

  await new PullSetting({
    project: project._id
  }).save()

  try {
    const cloudfront = await createDistribution(project.name)
    const { Id: identifier, DomainName: domain } = cloudfront.Distribution
    await new Infrastructure({
      project: project._id,
      identifier,
      domain,
      provider
    }).save()
  } catch (error) {
    await Project.findOneAndRemove({ _id: project._id })
    await Permission.deleteMany({ project: project._id })
    await PullSetting.deleteMany({ project: project._id })
    throw error
  }
  return project
}

export const remove = async (_project) => {

  const { _id, isActive } = _project

  if (isActive) {
    return false
  }

  try {
    await Project.findOneAndRemove({ _id })
  } catch (error) {
    throw ('Error Cannot delete project')
  }
  await Preset.deleteMany({ project: _id })
  await PullSetting.deleteMany({ project: _id })
  await SecretKey.deleteMany({ project: _id })
  await Permission.deleteMany({ project: _id })
  return true
}

export const invalidateCache = async (patterns = [], identifier, prettyOrigin) => {
  const { cdnServer } = config
  const normalizedPatterns = patterns
    .map(
      (pattern) => normalizePattern(pattern, prettyOrigin)
    )
    .filter(Boolean)

  if (!normalizedPatterns.length) {
    return true
  }
  await request
    .post(`${ cdnServer }/${ identifier }/cache-invalidations`)
    .set('Content-Type', 'application/json')
    .send({
      patterns: normalizedPatterns
    })

  return true
}

export const invalidateAllCache = async (identifier) => {
  const { cdnServer } = config
  await request
    .post(`${ cdnServer }/projects/${ identifier }/cache-invalidations`)
    .set('Content-Type', 'application/json')
    .send({
      patterns: [ '/*' ]
    })

  return true
}
