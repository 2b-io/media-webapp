import {
  GraphQLFloat,
  GraphQLList
} from 'graphql'

import createCloudwatchService from 'services/cloudwatch'
import searchDataAll from 'services/search-data-all'
import { Datapoint } from '../datapoint'

const compareDateTimeString = (firstDateTime, secondDateTime) => {
  return new Date(firstDateTime) - new Date(secondDateTime)
}

const generateRangeTimes = (startTime, endTime) => {
  let timePoint = startTime
  let dates = []

  while (timePoint < endTime && timePoint < Date.now()) {
    dates.push(timePoint)
    timePoint += 60 * 1000
  }

  return dates
}

const formatDataMetric = (metricData, { startTime, endTime, period }) => {
  const originRangeTimes = generateRangeTimes(Number(startTime), Number(endTime), Number(period))

  const indices = metricData.reduce(
    (indices, datapoint ) => ({
      ...indices,
      [ new Date(datapoint.timestamp).getTime() ]: datapoint.value
    }),
    {}
  )

  const originDatapoints = originRangeTimes.map((time) => ({
    timestamp: time,
    value: indices[ time ] || 0
  }))

  let datapoints = []

  originDatapoints.forEach(
    (datapoint) => {
      const { timestamp, value } = datapoint

      const index = Math.floor((timestamp - startTime) / (period * 60 * 1000))

      if (!datapoints[ index ]) {
        datapoints[ index ] = {
          timestamp: new Date(timestamp).toISOString(),
          value: 0
        }
      }

      datapoints[ index ].value += value
    }
  )

  return datapoints
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
      const metricData = await searchDataAll(
        cloudwatchService.metricCloudfront(
            projectIdentifier,
            name.toLowerCase(),
            startTime,
            endTime,
            period
        )
      )

      const datapoints = await formatDataMetric(
        metricData,
        {
          startTime,
          endTime,
          period
        }
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
