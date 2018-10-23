import request from 'superagent'

import config from 'infrastructure/config'

const invalidateCacheByPreset = async (identifier, presetHash) => {
  return await request
    .post(`${ config.cdnServer }/projects/${ identifier }/presets/${ presetHash }/cache-invalidations`)
    .set('Content-Type', 'application/json')
    .send()
}

export default {
  invalidateCacheByPreset
}
