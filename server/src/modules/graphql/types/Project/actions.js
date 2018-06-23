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

export default ({ Project, ProjectStruct }) => ({
  _update: {
    args: {
      project: {
        type: new GraphQLNonNull(ProjectStruct)
      }
    },
    type: Project,
    resolve: async (self, { project }) => {
      const p = await updateProject(self.slug, project)

      // add ref
      p._account = self._account

      return p
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self) => {
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
    resolve: async (project, { preset }) => {
      const p = await createPreset(project, preset)

      // add ref
      p._project = project

      return p
    }
  }
})
