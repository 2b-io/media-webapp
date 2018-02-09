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

export default (Project, ProjectStruct) => ({
  account: {
    type: Account
  },
  permission: {
    type: GraphQLString,
    resolve: async (project, args, ctx) => {
      return 'owner'
    }
  },
  presets: {
    type: new GraphQLList(Preset),
    resolve: async (project, args, ctx) => {
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
    resolve: async (project, { hash }, ctx) => {
      const preset = await getPreset(project, hash)

      // add ref
      preset.project = project

      return preset
    }
  }
})
