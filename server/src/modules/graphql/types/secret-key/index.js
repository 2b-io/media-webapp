import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import actions from './actions'
import struct from './struct'

export const SecretKeyStruct = new GraphQLInputObjectType({
  name: 'SecretKeyStruct',
  fields: () => ({
    ...struct
  })
})
export const SecretKey = new GraphQLObjectType({
  name: 'SecretKey',
  fields: () => ({
    ...actions({ SecretKey, SecretKeyStruct }),
    ...struct
  })
})
