import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql'

import createAccountService from 'services/account'
import createPinnedProjectService from 'services/pinned-project'
import createProjectService from 'services/project'

import { PinnedProject } from '../pinned-project'
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
      const accountService = createAccountService(ctx._session.account.identifier)
      const updatedAccount = await accountService.update(self.identifier, account)

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
      const accountService = createAccountService(ctx._session.account.identifier)
      const updatedAccount = await accountService.changePassword(self.identifier, {
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
    resolve: async (account, { project, provider }, ctx) => {
      const projectService = createProjectService(ctx._session.account.identifier)
      const newProject = await projectService.create({ ...project, provider })

      return {
        ...newProject,
        account
      }
    }
  },
  _pinProjects: {
    args: {
      projectIdentifiers: {
        type: new GraphQLNonNull(GraphQLList(GraphQLString))
      }
    },
    type: new GraphQLList(PinnedProject),
    resolve: async (account, { projectIdentifiers }, ctx) => {
      const pinnedProjectService = createPinnedProjectService(ctx._session.account.identifier)

      const { projectIdentifiers: _projectIdentifiers } = await pinnedProjectService.update(account.identifier, projectIdentifiers)

      return _projectIdentifiers.map(
        (projectIdentifier) => ({ projectIdentifier })
      )

      // const filtered = await projectService.list(account._id, {
      //   identifier: {
      //     $in: _projectIdentifiers
      //   }
      // })

      // // add ref
      // return filtered.map((project) => {
      //   project.account = account

      //   return project
      // })
    }
  }
})
