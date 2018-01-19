import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  get as getPreset,
  list as listPresetsInProject
} from 'services/preset'

import Preset from './Preset'

export default new GraphQLObjectType({
  name: 'Project',
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    permission: {
      type: GraphQLString,
      resolve: async (project, args, ctx) => {
        return 'owner'
      }
    },
    presets: {
      type: new GraphQLList(Preset),
      resolve: async (project, args, ctx, ...rest) => {
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
      resolve: async (project, { hash }) => {
        return await getPreset(project, hash)
      }
    }
  }
})
