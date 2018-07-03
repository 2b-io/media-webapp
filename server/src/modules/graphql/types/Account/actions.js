import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import {
  create as createProject
} from 'services/project'
import {
  changePassword as changePassword
} from 'services/account'

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
  _updatePassword: {
    args: {
      currentPassword: {
        type: GraphQLNonNull(GraphQLString)
      },
      newPassword: {
        type: GraphQLNonNull(GraphQLString)
      },
      email: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (self, { currentPassword, newPassword, email }) => {
      const status =  await changePassword (currentPassword, newPassword, email)
      return status
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
