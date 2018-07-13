import { GraphQLBoolean, GraphQLNonNull } from 'graphql'

import {
  remove as removePreset,
  update as updatePreset
} from 'services/preset'

export default ({ Preset, PresetStruct }) => ({
  _update: {
    args: {
      preset: {
        type: GraphQLNonNull(PresetStruct)
      }
    },
    type: Preset,
    resolve: async (self, { preset }) => {
      const p = await updatePreset(self.project, self.hash, preset)

      // add ref
      p.project = self.project

      return p
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self) => {
      await removePreset(self.project, self.hash)

      return true
    }
  }
})
