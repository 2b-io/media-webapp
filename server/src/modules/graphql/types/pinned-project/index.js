import {
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import relationships from './relationships'
import struct from './struct'

export const PinnedProjectStruct = new GraphQLInputObjectType({
  name: 'PinnedProjectStruct',
  fields: () => ({
    ...struct
  })
})

export const PinnedProject = new GraphQLObjectType({
  name: 'PinnedProject',
  fields: () => ({
    ...struct,
    ...relationships()
  })
})
