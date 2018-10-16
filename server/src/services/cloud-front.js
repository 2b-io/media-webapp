import request from 'superagent'

import config from 'infrastructure/config'

const { cdnServer } = config

const create = async (data) => {
  const distribution = await request
    .post(`${ cdnServer }/distributions`)
    .set('Content-Type', 'application/json')
    .send(data)

  return distribution.body
}

const get = async (identifier) => {
  const distribution = await request
    .get(`${ cdnServer }/distributions/${ identifier }`)
    .set('Content-Type', 'application/json')

  return distribution.body
}

const remove = async (identifier) => {
  await request
    .delete(`${ cdnServer }/distributions/${ identifier }`)
    .set('Content-Type', 'application/json')

  return true
}

const update = async (identifier, data) => {
  const distribution = await request
    .put(`${ cdnServer }/distributions/${ identifier }`)
    .set('Content-Type', 'application/json')
    .send(data)

  return distribution.body
}

export default {
  create,
  get,
  remove,
  update
}
