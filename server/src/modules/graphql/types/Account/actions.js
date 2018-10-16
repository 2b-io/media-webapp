import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import { create as createProject } from 'services/project'
import { update as updateAccount } from 'services/account'
import { changePassword } from 'services/account'
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
      return await updateAccount(self._id, account)
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

      const p = await createProject(project, provider, account)

      // add ref
      p.account = account

      return p
    }
  }
})
