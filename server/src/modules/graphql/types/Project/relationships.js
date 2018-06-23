import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import {
  get as getPreset,
  list as listPresetsInProject
} from 'services/preset'

import { Account } from '../Account'
import { Preset } from '../Preset'

export default () => ({
  account: {
    type: Account
  },
  permission: {
    type: GraphQLString,
    resolve: async () => {
      return 'owner'
    }
  },
  presets: {
    type: new GraphQLList(Preset),
    resolve: async (project) => {
      let presets = await listPresetsInProject(project)

      return presets.map(preset => {
        // add ref
        preset.project = project

        return preset
      })
    }
  },
  preset: {
    args: {
      hash: {
        type: GraphQLString
      }
    },
    type: Preset,
    resolve: async (project, { hash }) => {
      const preset = await getPreset(project, hash)

      // add ref
      preset.project = project

      return preset
    }
  }
})
