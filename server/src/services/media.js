import request from 'superagent'

import config from 'infrastructure/config'

export const getListMedia = async (slug) => {
  const { cdnServer } = config

  const listMedia = await request
    .get(`${ cdnServer }/projects/${ slug }/media`)
    .set('Content-Type', 'application/json')

  return listMedia.body
}

export const getMedia = async (slug, id) => {
  const { cdnServer } = config

  const media = await request
    .get(`${ cdnServer }/projects/${ slug }/media/${ id }`)
    .set('Content-Type', 'application/json')

  return media.body
}

export const removeMedia = async (slug, id) => {
  const { cdnServer } = config

  const media = await request
    .delete(`${ cdnServer }/projects/${ slug }/media/${ id }`)
    .set('Content-Type', 'application/json')

  return media.body
}
