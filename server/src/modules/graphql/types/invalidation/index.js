import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import struct from './struct'

export const InvalidationStruct = new GraphQLInputObjectType({
  name: 'InvalidationStruct',
  fields: () => ({
    ...struct
  })
})

export const Invalidation = new GraphQLObjectType({
  name: 'Invalidation',
  fields: () => ({
    ...struct
  })
})
