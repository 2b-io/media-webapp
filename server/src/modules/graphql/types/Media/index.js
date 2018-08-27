import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import actions from './actions'
import struct from './struct'

export const MediaStruct = new GraphQLInputObjectType({
  name: 'MediaStruct',
  fields: () => ({
    ...struct
  })
})
export const Media = new GraphQLObjectType({
  name: 'Media',
  fields: () => ({
    ...struct,
    ...actions({ Media, MediaStruct })
  })
})
