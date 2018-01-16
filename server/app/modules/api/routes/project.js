import {
  create as createProject,
  destroy as destroyProject,
  get as getProject,
  list as listAllProjects,
  update as updateProject
} from '../controllers/project'

export default app => {
  app.route('/projects')
    .get(listAllProjects)
    .post(createProject)

  app.route('/projects/:slug')
    .get(getProject)
    .put(updateProject)
    .delete(destroyProject)
}
