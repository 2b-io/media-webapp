import initAccountRoutes from './account'
import initProjectRoutes from './project'
import initSessionRoutes from './session'

export default app => {
  initProjectRoutes(app)
  initSessionRoutes(app)
  initAccountRoutes(app)

  app.use((req, res) => {
    res.status(503).send('Wrong API Endpoint')
  })
}
