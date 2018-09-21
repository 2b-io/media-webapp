import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'
import struct from './struct'

export const secretKeyStruct = new GraphQLInputObjectType({
  name: 'SecretKeyStruct',
  fields: () => ({
    ...struct
  })
})
export const secretKey = new GraphQLObjectType({
  name: 'SecretKey',
  fields: () => ({
    ...struct
  })
})
