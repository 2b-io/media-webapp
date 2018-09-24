import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList

} from 'graphql'

import {
  create as createAccount,
  findByEmail as findAccountByEmail
} from 'services/account'
import {
  create as createPreset
} from 'services/preset'
import {
  invite as inviteCollaborator,
  remove as removeCollaborator,
  makeOwner as makeOwner
} from 'services/permission'
import {
  remove as removeProject,
  update as updateProject,
  invalidateCache,
  invalidateAllCache
} from 'services/project'
import {
  forgotPassword as forgotPassword,
} from 'services/reset-password-code'
import { sendEmailInviteToRegister } from 'services/send-email'

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
      const p = await updateProject(self.identifier, project)

      // add ref
      p._account = self._account

      return p
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self) => {
      await removeProject(self)

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
      const p = await createPreset(project._id, preset)

      // add ref
      p._project = project

      return p
    }
  },
  _inviteCollaborator: {
    args: {
      email: {
        type: GraphQLNonNull(GraphQLString)
      },
      messenge: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: Collaborator,
    resolve: async (project, { email, messenge }) => {
      const account = await findAccountByEmail(email)

      if(!account) {
        await createAccount({ email })
        const { code } = await forgotPassword(email)
        await sendEmailInviteToRegister(email, code, messenge)
      }

      const p = await inviteCollaborator(project, email)

      // add ref
      p.project = project

      return p
    }
  },
  _removeCollaborator: {
    args: {
      accountId: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (project, { accountId }) => {
      const { _id } = project
      return await removeCollaborator(_id, accountId)
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
  _invalidateCache: {
    args: {
      patterns: {
        type: GraphQLNonNull(GraphQLList(GraphQLString))
      }
    },
    type: GraphQLBoolean,
    resolve: async (project, { patterns }) => {
      const { identifier, prettyOrigin } = project
      return await invalidateCache(patterns, identifier, prettyOrigin)
    }
  },
  _invalidateAllCache: {
    type: GraphQLBoolean,
    resolve: async (project) => {
      const { identifier, prettyOrigin } = project
      return await invalidateAllCache(identifier, prettyOrigin)
    }
  },
})
