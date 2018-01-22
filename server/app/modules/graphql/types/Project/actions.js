import {
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'

import {
  remove as removeProject
} from 'services/project'

import { Preset, PresetStruct } from '../Preset'

export default (Project, ProjectStruct) => ({
  _update: {
    args: {
      project: {
        type: new GraphQLNonNull(ProjectStruct)
      }
    },
    type: Project,
    resolve: async (self, { project }, ctx) => {
      return project
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self, args, ctx) => {
      await removeProject(self.slug)

      return true
    }
  },
  _createPreset: {
    args: {
      preset: {
        type: new GraphQLNonNull(PresetStruct)
      }
    },
    type: Preset,
    resolve: async (project, { preset }, ctx) => {
      return preset
    }
  }
})
