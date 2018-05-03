import { GraphQLBoolean, GraphQLNonNull } from 'graphql'

import {
  remove as removePreset,
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
      const p = await updatePreset(self._project, self.hash, preset)

      // add ref
      p._project = self._project

      return p
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self, args, ctx) => {
      await removePreset(self._project, self.hash)

      return true
    }
  }
})
