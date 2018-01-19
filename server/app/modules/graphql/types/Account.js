import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  getBySlug as getProjectBySlug,
  list as listProjectsByAccount
} from 'services/project'

import Project from './Project'

export default new GraphQLObjectType({
  name: 'Account',
  fields: {
    _id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    projects: {
      type: new GraphQLList(Project),
      resolve: async (account, args, ctx) => {
        return await listProjectsByAccount(account._id)
      }
    },
    project: {
      args: {
        slug: {
          type: GraphQLString
        }
      },
      type: Project,
      resolve: async (account, { slug }, ctx) => {
        return await getProjectBySlug(slug)
      }
    }
  }
})
