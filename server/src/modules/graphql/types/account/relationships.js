import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import createPinnedProjectService from 'services/pinned-project'
import createProjectService from 'services/project'
import { PinnedProject } from '../pinned-project'
import { Project } from '../project'
import { Session } from '../session'

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
    type: new GraphQLList(PinnedProject),
    resolve: async (account, args, ctx) => {
      const pinnedProjectService = createPinnedProjectService(ctx._session.account.identifier)

      const { projectIdentifiers } = await pinnedProjectService.list(account.identifier)

      return projectIdentifiers.map(
        (projectIdentifier) => ({ projectIdentifier })
      )

      // const filtered = await projectService.list(account._id, {
      //   identifier: {
      //     $in: projectIdentifiers
      //   }
      // })

      // // add ref
      // return filtered.map((project) => {
      //   project.account = account

      //   return project
      // })
    }
  }
})
