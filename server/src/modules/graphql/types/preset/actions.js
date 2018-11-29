import { GraphQLBoolean, GraphQLNonNull } from 'graphql'

import {
  remove as removePreset,
  update as updatePreset
} from 'services/preset'

import createPresetService from 'services/preset'

export default ({ Preset, PresetStruct }) => ({
  _update: {
    args: {
      preset: {
        type: GraphQLNonNull(PresetStruct)
      }
    },
    type: Preset,
    resolve: async (self, { preset }) => {
      const { project, contentType } = self
      const p = await updatePreset(project, contentType, preset)

      // add ref
      p.project = self.project

      return p
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self) => {
      const {
        project: {
          account: {
            identifier: accountIdentifier
          },
          identifier: projectIdentifier
        },
        contentType
      } = self

      const presetService = createPresetService(accountIdentifier)
      await presetService.remove(projectIdentifier, contentType)

      return true
    }
  }
})
