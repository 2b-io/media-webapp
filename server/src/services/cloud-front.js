import request from 'superagent'

import config from 'infrastructure/config'

const { cdnServer } = config

const create = async (data) => {
  const response = await request
    .post(`${ cdnServer }/distributions`)
    .set('Content-Type', 'application/json')
    .send(data)

  return response.body
}

const get = async (identifier) => {
  const response = await request
    .get(`${ cdnServer }/distributions/${ identifier }`)
    .set('Content-Type', 'application/json')

  return response.body
}

const remove = async (identifier) => {
  await request
    .delete(`${ cdnServer }/distributions/${ identifier }`)
    .set('Content-Type', 'application/json')

  return true
}

const update = async (identifier, data) => {
  const response = await request
    .put(`${ cdnServer }/distributions/${ identifier }`)
    .set('Content-Type', 'application/json')
    .send(data)

  return response.body
}

export default {
  create,
  get,
  remove,
  update
}
