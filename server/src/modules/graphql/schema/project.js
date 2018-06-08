import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql'
import {
  list as listProjectsByAccount,
} from 'services/project'
import {
  verify as verifySession
} from 'services/session'

import { Project } from '../types/Project'

export default () => ({
  projectList: {
    args: {
      token: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: new GraphQLList(Project),
      resolve: async (rootValue, args, ctx) => {
        const { token, refresh = false } = args
        const session = await verifySession(token,{refresh})
        const {account} = session
        const projects = await listProjectsByAccount(account._id)
        return projects.map(project => {
          project.account = account
          return project
        })
      }
  }
})
