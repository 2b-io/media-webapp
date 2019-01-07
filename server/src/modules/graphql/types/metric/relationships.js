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
      if (name === 'BYTES_DOWNLOADED' || name === 'REQUESTS') {
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

      if (name === 'TIME_CONSUMED' || name === 'CDN_REQUESTS') {
        const datapoints = [
          { timestamp: '2018-12-31T00:00:00.000Z', value: 2132 },
          { timestamp: '2019-01-01T00:00:00.000Z', value: 22 },
          { timestamp: '2019-01-02T00:00:00.000Z', value: 122 },
          { timestamp: '2019-01-03T00:00:00.000Z', value: 12312 },
          { timestamp: '2019-01-04T00:00:00.000Z', value: 1231231 },
          { timestamp: '2019-01-05T00:00:00.000Z', value: 12312 },
          { timestamp: '2019-01-06T00:00:00.000Z', value: 123 },
          { timestamp: '2019-01-07T00:00:00.000Z', value: 12 }
        ]

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

      return null
    }
  }
})
