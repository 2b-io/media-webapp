import {
  GraphQLID,
  GraphQLObjectType
} from 'graphql'

import relationships from './relationships'
import struct from './struct'

export const Collaborator = new GraphQLObjectType({
  name: 'Collaborator',
  fields: () => ({
    ...struct,
    ...relationships({ Collaborator })
  })
})
