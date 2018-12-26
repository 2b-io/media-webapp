import {
  GraphQLFloat,
  GraphQLList
} from 'graphql'

import createCloudwatchService from 'services/cloudwatch'
import { Datapoint } from '../datapoint'

const compareDateTimeString = (firstDateTime, secondDateTime) => {
  return new Date(firstDateTime) - new Date(secondDateTime)
}

export default () => ({
  datapoints: {
    args: {
      startTime: {
        type: GraphQLFloat
      },
      endTime: {
        type: GraphQLFloat
      },
      period: {
        type: GraphQLFloat
      }
    },
    type: new GraphQLList(Datapoint),
    resolve: async ({ projectIdentifier, name }, { startTime, endTime, period }, ctx) => {
      const cloudwatchService = createCloudwatchService(ctx._session.account.identifier)
      const datapoints = await cloudwatchService.metricCloudfront(
        projectIdentifier,
        name.toLowerCase(),
        startTime,
        endTime,
        period
      )

      return datapoints.map(({
        value,
        timestamp
      }) => ({
        value,
        timestamp: Date.parse(new Date(timestamp))
      })).sort(
        (datapoint, nextDatapoint) => (
          compareDateTimeString(datapoint.timestamp, nextDatapoint.timestamp)
        )
      )
    }
  }
})
