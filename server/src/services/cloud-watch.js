import querystring from 'querystring'
import request from 'superagent'

import infrastructure from 'services/infrastructure'
import project from 'services/project'
import config from 'infrastructure/config'

const metriCloudfront = async (projectId, name, startTime, endTime, period) => {
  const { identifier: distributionIdentifier } = await infrastructure.get(projectId)
  const params = querystring.stringify({ startTime, endTime, period })

  const response = await request
    .get(`${ config.cdnServer }/distributions/${ distributionIdentifier }/metrics/${ name }/datapoints?${ params }`)
    .set('Content-Type', 'application/json')

  return response.body
}

export default {
  metriCloudfront
}
