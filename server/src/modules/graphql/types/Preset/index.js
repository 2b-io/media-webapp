import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import actions from './actions'
import relationships from './relationships'
import struct from './struct'

export const PresetStruct = new GraphQLInputObjectType({
  name: 'PresetStruct',
  fields: () => ({
    ...struct
  })
})

export const Preset = new GraphQLObjectType({
  name: 'Preset',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    ...struct,
    ...actions(Preset, PresetStruct),
    ...relationships(Preset, PresetStruct)
  })
})
