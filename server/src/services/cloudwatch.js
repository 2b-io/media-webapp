import request from 'superagent'

import config from 'infrastructure/config'

const metricCloudfront = async (projectIdentifier, name, startTime, endTime, period) => {
  const response = await request('get', `${ config.apiUrl }/projects/${ projectIdentifier }/metrics/${ name }/datapoints?startTime=${ new Date(startTime).toISOString() }&endTime=${ new Date(endTime).toISOString() }&period=${ period }`)
    .set('Content-Type', 'application/json')
    .set('Authorization', 'MEDIA_CDN app=webapp')

  return response.body
}

export default {
  metricCloudfront
}
