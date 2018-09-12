import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import struct from './struct'

export const InfrastructureStruct = new GraphQLInputObjectType({
  name: 'InfrastructureStruct',
  fields: () => ({
    ...struct
  })
})
export const Infrastructure = new GraphQLObjectType({
  name: 'Infrastructure',
  fields: () => ({
    ...struct
  })
})
