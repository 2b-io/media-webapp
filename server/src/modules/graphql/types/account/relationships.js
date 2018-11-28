import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import projectService from 'services/project'
import pinnedProjectService from 'services/pinned-project'
import { Project } from '../Project'
import { Session } from '../Session'

export default () => ({
  session: {
    type: Session
  },
  projects: {
    type: new GraphQLList(Project),
    resolve: async (account) => {
      const projects = await projectService.list(account._id)

      // add ref
      return projects.map((project) => {
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
      const project = await projectService.get({
        identifier
      }, account._id)

      // add ref
      project.account = account
      return project
    }
  },
  pinnedProjects: {
    type: new GraphQLList(Project),
    resolve: async (account) => {
      const pinnedProjects = await pinnedProjectService.list(account._id)

      const filtered = await projectService.list(account._id, {
        identifier: {
          $in: pinnedProjects
        }
      })

      // add ref
      return filtered.map((project) => {
        project.account = account

        return project
      })
    }
  }
})