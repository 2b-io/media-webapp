import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import { create as createProject } from 'services/project'
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
      return account
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
      }
    },
    type: Project,
    resolve: async (account, { project }) => {
      const p = await createProject(project, account)

      // add ref
      p._account = account

      return p
    }
  }
})
