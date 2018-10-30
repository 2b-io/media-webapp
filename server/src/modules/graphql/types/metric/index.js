import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import { Datapoint, DatapointStruct } from '../datapoint'
import struct from './struct'
import relationships from './relationships'

export const MetricStruct = new GraphQLInputObjectType({
  name: 'MetricStruct',
  fields: () => ({
    ...struct
  })
})

export const Metric = new GraphQLObjectType({
  name: 'Metric',
  fields: () => ({
    ...struct,
    ...relationships({ Metric, MetricStruct })
  })
})
