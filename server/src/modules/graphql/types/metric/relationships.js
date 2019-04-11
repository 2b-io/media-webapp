import {
  GraphQLFloat,
  GraphQLList
} from 'graphql'

import config from 'infrastructure/config'
import createCloudwatchService from 'services/cloudwatch'
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
          timestamp,
          value: 0
        }
      }

      datapoints[ index ].value += value
    }
  )

  return datapoints
}

const getDataAll = async (accountIdentifier, projectIdentifier, name, startTime, endTime, period) => {
  const cloudwatchService = createCloudwatchService(accountIdentifier)

  let totalHits = 0
  let total = 0
  let sources = []
  let from = 0

  do {
    const {
      listData,
      total: _total
    } = await cloudwatchService.metricCloudfront(
      projectIdentifier,
      name,
      startTime,
      endTime,
      period,
      from
    )
    from = from + Number(config.pageSize)

    totalHits = totalHits + listData.length
    total = _total

    sources = [
      ...sources,
      ...listData.map(({ _source }) => _source)
    ]
  } while (totalHits < total)

  return sources
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

      const metricData = await getDataAll(
        ctx._session.account.identifier,
        projectIdentifier,
        name.toLowerCase(),
        startTime,
        endTime,
        period
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
