import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import projectService from 'services/project' //old code

import createPinnedProjectService from 'services/pinned-project'
import createProjectService from 'services/project'
import { Project } from '../Project'
import { Session } from '../Session'

export default () => ({
  session: {
    type: Session
  },
  projects: {
    type: new GraphQLList(Project),
    resolve: async (account, args, ctx) => {
      const projectService = createProjectService(ctx._session.account.identifier)
      const projects = await projectService.list()

      //add ref
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
    resolve: async (account, { identifier: projectIdentifier }, ctx) => {
      const projectService = createProjectService(ctx._session.account.identifier)
      const project = await projectService.get(projectIdentifier)

      return {
        ...project,
        account
      }
    }
  },
  pinnedProjects: {
    type: new GraphQLList(Project),
    resolve: async (account) => {

      const pinnedProjectService = await createPinnedProjectService(account.identifier)

      const { projectIdentifiers } = await pinnedProjectService.list(account.identifier)

      const filtered = await projectService.list(account._id, {
        identifier: {
          $in: projectIdentifiers
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
