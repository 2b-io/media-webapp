import { GraphQLBoolean, GraphQLNonNull } from 'graphql'

export default (Preset, PresetStruct) => ({
  _update: {
    args: {
      preset: {
        type: GraphQLNonNull(PresetStruct)
      }
    },
    type: Preset,
    resolve: async (self, { preset }, ctx) => {
      return preset
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self, args, ctx) => {
      return true
    }
  }
})
