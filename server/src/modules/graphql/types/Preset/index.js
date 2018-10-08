import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType
} from 'graphql'

import actions from './actions'
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
    ...struct,
    ...actions({ Preset, PresetStruct })
  })
})
