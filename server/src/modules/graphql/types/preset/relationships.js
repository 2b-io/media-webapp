import {
  GraphQLString
} from 'graphql'
import projectService from 'services/project'

import { Project } from '../Project'

export default () => ({
  project: {
    args: {
      project: {
        type: GraphQLString
      }
    },
    type: Project,
    resolve: async ({ project }) => {
      return await projectService.getByID(project)
    }
  }
})
