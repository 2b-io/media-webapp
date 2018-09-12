import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  getByIdentifier as getProjectByIdentifier,
  list as listProjectsByAccount
} from 'services/project'

import { Project } from '../Project'
import { Session } from '../Session'

export default () => ({
  session: {
    type: Session
  },
  projects: {
    type: new GraphQLList(Project),
    resolve: async (account) => {
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
      identifier: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    type: Project,
    resolve: async (account, { identifier }) => {
      const project = await getProjectByIdentifier(identifier)
      // add ref
      project.account = account
      return project
    }
  }
})
