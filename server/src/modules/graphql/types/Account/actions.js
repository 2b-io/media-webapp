import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import {
  changePassword,
  update as updateAccount
} from 'services/account'
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
    resolve: async (self, { account }) => {
      const updatedAccount = await updateAccount(self._id, account)

      // add ref
      updatedAccount.session = self.session

      return updatedAccount
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
    resolve: async (self, { currentPassword, newPassword }) => {
      return await changePassword(self._id, currentPassword, newPassword)
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
  }
})
