import {
  GraphQLID,
  GraphQLObjectType
} from 'graphql'

import struct from './struct'

export const Permission = new GraphQLObjectType({
  name: 'Permission',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    ...struct
  })
})
