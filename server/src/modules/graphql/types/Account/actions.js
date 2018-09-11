import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import { create as createProject } from 'services/project'
import { changePassword } from 'services/account'

import { Project } from '../Project'

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
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      provider: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Project,
    resolve: async (account, { name, provider }) => {

      const p = await createProject({ name, provider, account })

      // add ref
      p._account = account

      return p
    }
  }
})
