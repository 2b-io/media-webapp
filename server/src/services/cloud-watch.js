import request from 'superagent'

import infrastructure from 'services/infrastructure'
import project from 'services/project'
import config from 'infrastructure/config'

const { cdnServer } = config

const formatParamsMetric = ({
  distributionIdentifier,
  startTime,
  endTime,
  period
}) => {
  return {
    StartTime: startTime,
    EndTime: endTime,
    Period: period,
    Dimensions: [
      {
        Name: 'DistributionId',
        Value: 'distributionIdentifier'
      },
      {
        Name: 'Region',
        Value: 'Global'
      }
    ]
  }
}

const metricDownload = async ({ projectIdentifier, startTime, endTime, period }) => {
  const { _id: projectID } = await project.getByIdentifier(projectIdentifier)
  const { identifier: distributionIdentifier } = await infrastructure.get(projectID)
  const params = formatParamsMetric({ distributionIdentifier, startTime, endTime, period })

  const response = await request
    .post(`${ cdnServer }/distributions/metric/download`)
    .set('Content-Type', 'application/json')
    .send({ params })

  return response.body
}

const metricUpload = async ({ projectIdentifier, startTime, endTime, period }) => {
  const { _id: projectID } = await project.getByIdentifier(projectIdentifier)
  const { identifier: distributionIdentifier } = await infrastructure.get(projectID)
  const params = formatParamsMetric({ distributionIdentifier, startTime, endTime, period })
  
  const response = await request
    .post(`${ cdnServer }/distributions/metric/upload`)
    .set('Content-Type', 'application/json')
    .send({ params })

  return response.body
}

export default {
  metricDownload,
  metricUpload
}
