import {
  GraphQLFloat,
  GraphQLList
} from 'graphql'

import cloudWatch from 'services/cloud-watch'
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
      const { project, name } = self
      const { datapoints } = await cloudWatch.metriCloudfront(
        project,
        name,
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
