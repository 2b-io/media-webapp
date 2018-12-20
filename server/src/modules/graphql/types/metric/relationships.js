import {
  GraphQLFloat,
  GraphQLList
} from 'graphql'

import cloudwatch from 'services/cloudwatch'
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
    resolve: async (self, { startTime, endTime, period }) => {
      const { datapoints } = await cloudwatch.metricCloudfront(
        self.projectIdentifier,
        self.name.toLowerCase(),
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
