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
      const projects = await listProjectsByAccount(account._id)

      return projects.map(project => {
        project._account = account

        return project
      })
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
      const project = await getProjectBySlug(slug)

      // add ref
      project._account = account

      return project
    }
  }
})
