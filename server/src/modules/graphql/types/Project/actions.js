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
  list as getPermissionList,
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
  forgotPassword as createResetCode
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
      return removeProject(self)
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
  _addCollaboratorsByEmails: {
    args: {
      emails: {
        type: GraphQLNonNull(GraphQLList(GraphQLString))
      },
      messenge: {
        type: GraphQLString
      }
    },
    type: GraphQLList(Collaborator),
    resolve: async (project, { emails, messenge }) => {
      // create account & send email invite

      const existedAccounts = (await Promise.all(
        emails.map(async (email) => await findAccountByEmail(email))
      )).filter(Boolean)

      // Emails do not exist on systems
      const notExistedEmails = emails.filter(
        (email) => !existedAccounts.some(
          (account) => account.email === email
        )
      )

      // create accounts
      const newAccounts = await Promise.all(
        notExistedEmails.map(
          async (email) => await createAccount({ email })
        )
      )

      // Invite: create code & send email
      await Promise.all(
        newAccounts.map(
          async ({ email }) => {
            const resetPasswordCode = await createResetCode(email)
            const { code } = resetPasswordCode
            await sendEmailInviteToRegister(email, code, messenge)
          }
        )
      )

      // get account id on permission
      const collaboratorIDs = (await getPermissionList(project)).map(permission => permission.account)

      //filter account are not collaborator
      const notCollaborators = existedAccounts.filter(
        (account) => !collaboratorIDs.some(
          (id) => String(id) === String(account._id)
        )
      )

      const accountsToInvite = [ ...notCollaborators, ...newAccounts ]

      // add to project
      const collaborators = await Promise.all(
        accountsToInvite.map(
          async (account) => await inviteCollaborator(project, account)
        )
      )

      return collaborators.map(
        (collaborator) => ({
          project,
          ...collaborator.toJSON()
        })
      )
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
      await makeOwner(project, { accountId })

      return true
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
