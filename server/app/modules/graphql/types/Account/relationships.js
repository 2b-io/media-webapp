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
import { Session } from '../Session'

export default (Account, AccountStruct) => ({
  session: {
    type: Session
  },
  projects: {
    type: new GraphQLList(Project),
    resolve: async (account, args, ctx) => {
      const projects = await listProjectsByAccount(account._id)

      return projects.map(project => {
        // add ref
        project.account = account

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
      project.account = account

      return project
    }
  }
})
