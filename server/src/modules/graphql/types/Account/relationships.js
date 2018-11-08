import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import projectService from 'services/project'
import pinProjectService from 'services/pin-project'
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
      return projects.map(project => {
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
  projectPins: {
  type: new GraphQLList(Project),
  resolve: async (account) => {
    const { projects: projectPins } = await pinProjectService.get(account._id)

    const projectList = await projectService.list(account._id)

    return projectList.filter((
      {
        identifier: projectIdentifier
      }) => projectPins.some((projectPin) => projectIdentifier === projectPin))
    }
  }
})
