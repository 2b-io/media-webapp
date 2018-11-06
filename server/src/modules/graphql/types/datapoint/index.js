import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import struct from './struct'

export const DatapointStruct = new GraphQLInputObjectType({
  name: 'DatapointsStruct',
  fields: () => ({
    ...struct
  })
})

export const Datapoint = new GraphQLObjectType({
  name: 'Datapoint',
  fields: () => ({
    ...struct
  })
})
