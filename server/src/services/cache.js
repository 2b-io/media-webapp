import request from 'superagent'

import config from 'infrastructure/config'

export const invalidateCacheByPreset = async (identifier, presetHash) => {
  const { cdnServer } = config
  return await request
    .post(`${ cdnServer }/projects/${ identifier }/cache-invalidations`)
    .set('Content-Type', 'application/json')
    .send({
      presetHash
    })
}

export default {
  invalidateCacheByPreset
}
