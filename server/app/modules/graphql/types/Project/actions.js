import {
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'

import {
  create as createPreset
} from 'services/preset'
import {
  remove as removeProject,
  update as updateProject
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
      return await updateProject(self.slug, project)
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
      return await createPreset(project, preset)
    }
  }
})
