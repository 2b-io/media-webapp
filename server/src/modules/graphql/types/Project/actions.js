import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList

} from 'graphql'

import {
  create as createPreset
} from 'services/preset'
import {
  invite as inviteCollaborator,
  deleteCollaborator as deleteCollaborator,
  makeOwner as makeOwner
} from 'services/permission'
import {
  remove as removeProject,
  update as updateProject,
  invalidCache as invalidCache
} from 'services/project'

import { Collaborator } from '../Collaborator'
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
  },
  _inviteCollaborator: {
    args: {
      email: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: Collaborator,
    resolve: async (project, { email }) => {
      const p = await inviteCollaborator(project, email)

      // add ref
      p.project = project

      return p
    }
  },
  _deleteCollaborator: {
    args: {
      accountId: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (project, { accountId }) => {
      const { _id } = project
      return await deleteCollaborator(_id, accountId)
    }
  },
  _makeOwner: {
    args: {
      accountId: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (project, { accountId }) => {

      return await makeOwner(project, { accountId })
    }
  },
  _invalidCache: {
    args: {
      patterns: {
        type: GraphQLNonNull(GraphQLList(GraphQLString))
      }
    },
    type: GraphQLBoolean,
    resolve: async (project, { patterns }) => {

      return await invalidCache(patterns)
    }
  }
})
