import {
  create as createProject,
  get as getProject,
  list as listAllProjects,
  update as updateProject
} from '../controllers/project'

export default app => {
  app.get('/projects', listAllProjects)
  app.get('/projects/:slug', getProject)
  app.post('/projects', createProject)
  app.put('/projects/:slug', updateProject)
}
