import request from 'superagent'
import { URL } from 'url'

import config from 'infrastructure/config'
import Infrastructure from 'models/Infrastructure'
import { createDistribution, getDistribution, updateDistribution } from 'services/cloudFront'
import Permission from 'models/Permission'
import pullSetting from 'models/pull-setting'
import secretKey from 'models/secret-key'
import Preset from 'models/Preset'
import Project from 'models/Project'

const normalizePattern = (path, origin) => {
  try {
    return new URL(path, origin || undefined).toString()
  } catch (e) {
    return null
  }
}

export const update = async ( projectIdentifier, data ) => {
  const { status } = data
  const { status: currentStatus, _id } = await Project.findOne({
    identifier: projectIdentifier,
    removed: false
  }).lean()

  if (currentStatus !== status) {
    const { identifier: distributionId } = await Infrastructure.findOne({ project: _id })
    const enabled = status === 'DISABLED' ? false : true
    await updateDistribution(distributionId, enabled)

    return await Project.findOneAndUpdate(
      { identifier: projectIdentifier },
      { ...data, status: 'UPDATING' },
      { new: true }
    ).lean()
  }

  return await Project.findOneAndUpdate(
    { identifier: projectIdentifier },
    { ...data },
    { new: true }
  ).lean()
}

export const getByIdentifier = async (projectIdentifier, account) => {

  const project = await Project.findOne({
    identifier: projectIdentifier,
    removed: false
  }).lean()

  //  check permission
  const permission = await Permission.findOne({
    account,
    project: {
      $eq: project._id
    }
  }).lean()

  if (!permission) {
    return
  }

  const { status: projectStatus } = project

  if (projectStatus === 'INITIALIZING' || projectStatus === 'UPDATING') {
    const { identifier: distributionId } = await Infrastructure.findOne({ project: project._id })
    const { Distribution: distribution } = await getDistribution(distributionId)
    const { Status: distributionStatus } = distribution
    const status = (distributionStatus === 'InProgress') ?
      projectStatus === 'INITIALIZING' ? 'INITIALIZING' : 'UPDATING' :
      distributionStatus.toUpperCase()

    return await Project.findOneAndUpdate(
      { identifier: projectIdentifier },
      { status },
      { new: true }
    ).lean()
  }

  return project
}
export const getById = async (id) => {
  return await Project.findOne({
    _id: id,
    removed: false
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
    },
    removed: false
  }).sort('_id').lean()

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

  await new pullSetting({
    project: project._id
  }).save()

  await new secretKey({
    key:"sss1",
    project: project._id
  }).save()

  const cloudfront = await createDistribution(project.name)
  const { Id: identifier, DomainName: domain } = cloudfront.Distribution
  await new Infrastructure({
    project: project._id,
    identifier,
    domain,
    provider
  }).save()

  return project
}

export const remove = async (_project) => {

  const { _id, slug } = _project
  const project = await Project.findOneAndRemove({ _id })

  await Preset.deleteMany({ project: _id })

  await Permission.deleteMany({ project: _id })

  await invalidateAllCache(slug)

  return project
}

export const invalidateCache = async (patterns = [], slug, prettyOrigin) => {
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
    .post(`${ cdnServer }/${ slug }/cache-invalidations`)
    .set('Content-Type', 'application/json')
    .send({
      patterns: normalizedPatterns
    })

  return true
}

export const invalidateAllCache = async (slug) => {
  const { cdnServer } = config
  await request
    .post(`${ cdnServer }/projects/${ slug }/cache-invalidations`)
    .set('Content-Type', 'application/json')
    .send({
      patterns: [ '/*' ]
    })

  return true
}
