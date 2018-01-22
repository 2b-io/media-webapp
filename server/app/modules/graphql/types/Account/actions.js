import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import {
  create as createProject
} from 'services/project'

import { Project, ProjectStruct } from '../Project'

export default (Account, AccountStruct) => ({
  _update: {
    args: {
      account: {
        type: new GraphQLNonNull(AccountStruct)
      },
    },
    type: Account,
    resolve: async (self, { account }, ctx) => {
      return account
    }
  },
  _destroy: {
    type: GraphQLBoolean,
    resolve: async (self, args, ctx) => {
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
    resolve: async (account, { project }, ctx) => {
      return await createProject(project, account)
    }
  }
})
