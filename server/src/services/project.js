import request from 'superagent'
import { URL } from 'url'

import config from 'infrastructure/config'
import Infrastructure from 'models/Infrastructure'
import { createDistribution } from 'services/cloudFront'
import Permission from 'models/Permission'
import Preset from 'models/Preset'
import Project from 'models/Project'

const normalizePattern = (path, origin) => {
  try {
    return new URL(path, origin || undefined).toString()
  } catch (e) {
    return null
  }
}

export const update = async ( slug, data ) => {
  return await Project.findOneAndUpdate(
    { slug }, { ...data },
    { new: true }
  ).lean()
}

export const getBySlug = async (slug) => {
  return await Project.findOne({
    slug,
    removed: false
  }).lean()
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
  }).sort('slug').lean()

  return projects
}

export const create = async (data, account) => {
  const { name, prettyOrigin, origins = [] } = data

  if (!name) {
    throw new Error('Invalid parameters')
  }

  const project = await new Project({
    name,
    prettyOrigin,
    origins,
    status:'INPROGRESS'
  }).save()

  await new Permission({
    project: project._id,
    account: account._id,
    privilege: 'owner'
  }).save()

  await new Preset({
    project: project._id,
    name: 'default',
    isDefault: true
  }).save()

  const distribution = await createDistribution()
  const { Id: id, DomainName: domainName } = distribution
  await new Infrastructure({
    project: project._id,
    id,
    domainName,
    provider: 'cloudfront',
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
