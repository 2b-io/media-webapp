import config from 'infrastructure/config'
import Infrastructure from 'models/Infrastructure'
import cloudFront from 'services/cloud-front'

export const create = async (project, provider) => {
  if (provider !== 'cloudfront') {
    throw 'Invalid parameters: Not support [provider] value'
  }

  const distribution = await cloudFront.create({
    identifier: project.identifier,
    cname: config.cdnCname
  })

  return await new Infrastructure({
    project: project._id,
    identifier: distribution.Id,
    domain: distribution.DomainName,
    cname: config.cdnCname,
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

  await Promise.all([
    Infrastructure.findOneAndRemove({
      _id: infrastructure._id
    }),
    cloudFront.remove(infrastructure.identifier)
  ])

  return true
}

export const update = async (projectID, data) => {
  const { identifier } = await get(projectID)

  return await cloudFront.update(identifier, data)
}

export default {
  create,
  get,
  remove,
  update
}
