import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLList
} from 'graphql'

import { Datapoint, DatapointStruct } from '../datapoint'
import struct from './struct'

export const MetricStruct = new GraphQLInputObjectType({
  name: 'MetricStruct',
  fields: () => ({
    ...struct,
    datapoints: {
      type: new GraphQLList(DatapointStruct)
    }
  })
})

export const Metric = new GraphQLObjectType({
  name: 'Metric',
  fields: () => ({
    ...struct,
    datapoints: {
      type: new GraphQLList(Datapoint)
    }
  })
})
