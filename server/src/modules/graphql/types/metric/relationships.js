import {
  GraphQLFloat,
  GraphQLList
} from 'graphql'

import createCloudwatchService from 'services/cloudwatch'
import { Datapoint } from '../datapoint'

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
      const { datapoints } = await cloudwatchService.metricCloudfront(
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
        timestamp
      })).sort(
        (datapoint, nextDatapoint) => (
          datapoint.timestamp - nextDatapoint.timestamp
        )
      )
    }
  }
})
