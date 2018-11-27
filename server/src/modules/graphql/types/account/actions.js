import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql'

import createAccountService from 'services/account'
import pinnedProjectService from 'services/pinned-project'
import projectService from 'services/project'

import { Project, ProjectStruct } from '../Project'

export default ({ Account, AccountStruct }) => ({
  _update: {
    args: {
      account: {
        type: new GraphQLNonNull(AccountStruct)
      },
    },
    type: Account,
    resolve: async (self, { account }, ctx) => {
      ctx._accountService = ctx._accountService ||
        createAccountService(ctx._session.account.identifier)

      const updatedAccount = await ctx._accountService.update(self.identifier, account)

      return {
        ...updatedAccount,
        session: self.session
      }
    }
  },
  _changePassword: {
    args: {
      currentPassword: {
        type: GraphQLNonNull(GraphQLString)
      },
      newPassword: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (self, { currentPassword, newPassword }, ctx) => {
      ctx._accountService = ctx._accountService ||
        createAccountService(ctx._session.account.identifier)

      const updatedAccount = await ctx._accountService.changePassword(self.identifier, {
        currentPassword,
        newPassword
      })

      return updatedAccount
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async () => {
      return true
    }
  },
  _createProject: {
    args: {
      project: {
        type: new GraphQLNonNull(ProjectStruct)
      },
      provider: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Project,
    resolve: async (account, { project, provider }) => {
      const p = await projectService.create(project, provider, account)

      // add ref
      p.account = account

      return p
    }
  },
  _pinProjects: {
    args: {
      projectIdentifiers: {
        type: new GraphQLNonNull(GraphQLList(GraphQLString))
      }
    },
    type: new GraphQLList(Project),
    resolve: async (account, { projectIdentifiers }) => {
      const pinnedProjects = await pinnedProjectService.update(account._id, projectIdentifiers)

      const filtered = await projectService.list(account._id, {
        identifier: {
          $in: pinnedProjects
        }
      })

      // add ref
      return filtered.map((project) => {
        project.account = account

        return project
      })
    }
  }
})
