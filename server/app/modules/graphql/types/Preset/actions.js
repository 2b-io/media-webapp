import { GraphQLBoolean, GraphQLNonNull } from 'graphql'

import {
  update as updatePreset
} from 'services/preset'

export default (Preset, PresetStruct) => ({
  _update: {
    args: {
      preset: {
        type: GraphQLNonNull(PresetStruct)
      }
    },
    type: Preset,
    resolve: async (self, { preset }, ctx) => {
      console.log(self)

      return await updatePreset(self._project, self.hash, preset)
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self, args, ctx) => {
      return true
    }
  }
})
