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
    resolve: async (self, { preset }, ctx) => {
      const {
        project: {
          identifier: projectIdentifier
        },
        contentType
      } = self

      const {
        isActive,
        parameters
      } = preset

      const presetService = createPresetService(ctx._session.account.identifier)
      const newPreset = await presetService.update(projectIdentifier, contentType, {
        isActive,
        parameters
      })

      return {
        ...newPreset,
        project: self.project
      }
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self, args, ctx) => {
      const {
        project: {
          identifier: projectIdentifier
        },
        contentType
      } = self

      const presetService = createPresetService(ctx._session.account.identifier)
      await presetService.remove(projectIdentifier, contentType)

      return true
    }
  }
})
