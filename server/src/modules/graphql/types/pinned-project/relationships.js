import { Project } from '../Project'

import createProjectService from 'services/project'

export default () => ({
  project: {
    type: Project,
    resolve: async (pinnedProject, args, ctx) => {
      const projectService = createProjectService(ctx._session.account.identifier)

      return await projectService.get(pinnedProject.projectIdentifier)
    }
  }
})
