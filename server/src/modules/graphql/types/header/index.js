import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'
import struct from './struct'

export const headerStruct = new GraphQLInputObjectType({
  name: 'HeaderStruct',
  fields: () => ({
    ...struct
  })
})
export const header = new GraphQLObjectType({
  name: 'Header',
  fields: () => ({
    ...struct
  })
})
