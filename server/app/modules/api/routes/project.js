import {
  get as getProject,
  list as listAllProjects,
  create as createProject
} from '../controllers/project'

export default app => {
  app.get('/projects', listAllProjects)
  app.get('/projects/:slug', getProject)
  app.post('/projects', createProject)
}
