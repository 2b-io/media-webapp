import {
  GraphQLList,
  GraphQLString
} from 'graphql'

import {
  get as getPreset,
  list as listPresetsInProject
} from 'services/preset'

import { Preset } from '../Preset'

export default (Project, ProjectStruct) => ({
  permission: {
    type: GraphQLString,
    resolve: async (project, args, ctx) => {
      return 'owner'
    }
  },
  presets: {
    type: new GraphQLList(Preset),
    resolve: async (project, args, ctx) => {
      return await listPresetsInProject(project)
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
      return await getPreset(project, hash)
    }
  }
})
