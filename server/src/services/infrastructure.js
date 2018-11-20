import request from 'superagent'

import config from 'infrastructure/config'
import Infrastructure from 'models/Infrastructure'
import cloudFront from 'services/cloud-front'

export const create = async (project, provider) => {
  if (provider !== 'cloudfront') {
    throw 'Invalid parameters: Not support [provider] value'
  }

  const { distribution, domain } = await cloudFront.create({
    identifier: project.identifier
  })

  return await new Infrastructure({
    project: project._id,
    identifier: distribution.Id,
    domain: distribution.DomainName,
    cname: domain,
    provider
  }).save()
}

export const get = async (projectID) => {
  return await Infrastructure.findOne({
    project: projectID
  }).lean()
}

export const remove = async (projectID) => {
  const infrastructure = await get(projectID)

  if (!infrastructure) {
    throw 'Infrastructure not found'
  }

  await cloudFront.remove(infrastructure.identifier)

  await Infrastructure.findOneAndRemove({
    _id: infrastructure._id
  })

  return true
}

export const update = async (projectID, data) => {
  const { identifier } = await get(projectID)

  return await cloudFront.update(identifier, data)
}

const createInfraJob = async (projectIdentifier) => {
  return await request
    .post(`${ config.jobServer }/jobs`)
    .set('Content-Type', 'application/json')
    .send({
      name: 'CHECK_INFRASTRUCTURE',
      when: Date.now(),
      payload: {
        projectIdentifier
      }
    })
}

export default {
  create,
  get,
  remove,
  update,
  createInfraJob
}
