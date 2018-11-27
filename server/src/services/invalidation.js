import request from 'superagent'

import config from 'infrastructure/config'

const list = async (projectIdentifier) => {
  const { body } = await request
    .get(`${ config.apiServer }/projects/${ projectIdentifier }/invalidations`)
    .set('Content-Type', 'application/json')
    .set('Authorization', 'MEDIA_CDN app=webapp')

  return body
}

const create = async (projectIdentifier, patterns) => {
  const { body } = await request
    .post(`${ config.apiServer }/projects/${ projectIdentifier }/invalidations`)
    .set('Content-Type', 'application/json')
    .set('Authorization', 'MEDIA_CDN app=webapp')
    .send({
      patterns
    })

  return body
}

export default {
  list,
  create
}
