import initSessionRoutes from './session'
import initTenantRoutes from './tenant'
import initUserRoutes from './user'

export default app => {
  initSessionRoutes(app)
  initTenantRoutes(app)
  initUserRoutes(app)

  app.use((req, res) => {
    res.status(503).send('Wrong API Endpoint')
  })
}
