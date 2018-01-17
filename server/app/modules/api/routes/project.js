import {
  create as createProject,
  get as getProject,
  list as listAllProjects,
  remove as removeProject,
  update as updateProject
} from '../controllers/project'

export default app => {
  app.route('/projects')
    .get(listAllProjects)
    .post(createProject)

  app.route('/projects/:slug')
    .get(getProject)
    .put(updateProject)
    .delete(removeProject)
}
