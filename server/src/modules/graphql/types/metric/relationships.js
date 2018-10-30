import {
  GraphQLFloat
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
    type: Datapoint,
    resolve: async (metric, { startTime, endTime, period }) => {
      return await cloudWatch.metriCloudfront(
        metric.projectId,
        metric.name,
        startTime,
        endTime,
        period
      )
    }
  }
})
