import querystring from 'querystring'
import request from 'superagent'

import createInfrastructureService from 'services/infrastructure'
import config from 'infrastructure/config'

const metriCloudfront = async (project, name, startTime, endTime, period) => {
  const infrastructureService = createInfrastructureService()
  const { identifier: distributionIdentifier } = await infrastructureService.get(project.identifier)

  const params = querystring.stringify({ startTime, endTime, period })

  const response = await request
    .get(`${ config.cdnServer }/distributions/${ distributionIdentifier }/metrics/${ name }/datapoints?${ params }`)
    .set('Content-Type', 'application/json')

  return response.body
}

export default {
  metriCloudfront
}
