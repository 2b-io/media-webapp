import {
  list as listAllProjects,
  create as createProject
} from '../controllers/project'

export default app => {
  app.get('/projects', listAllProjects)
  app.post('/projects', createProject)
}
