import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import {
  get as getPreset,
  list as listPresetsInProject
} from 'services/preset'

import {
  get as getPermission
} from 'services/permission'

import { Account } from '../Account'
import { Preset } from '../Preset'
import { Permission } from '../Permission'

export default () => ({
  account: {
    type: Account
  },
  permission: {
    type: Permission,
    resolve: async (project) => {
      let permission = await getPermission(project)
      permission.project = project
      return permission
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
      const preset = await getPreset(project)
      // add ref
      preset.project = project

      return preset
    }
  }
})
