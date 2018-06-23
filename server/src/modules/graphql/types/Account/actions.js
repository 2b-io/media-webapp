import {
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'

import {
  create as createProject
} from 'services/project'

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
