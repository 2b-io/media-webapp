import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  getBySlug as getProjectBySlug,
  list as listProjectsByAccount
} from 'services/project'
import { Project } from '../Project'

export default (Account, AccountStruct) => ({
  projects: {
    type: new GraphQLList(Project),
    resolve: async (account, args, ctx) => {
      return await listProjectsByAccount(account._id)
    }
  },
  project: {
    args: {
      slug: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Project,
    resolve: async (account, { slug }, ctx) => {
      return await getProjectBySlug(slug)
    }
  }
})
