import initTenantRoutes from './tenant'

export default app => {
  initTenantRoutes(app)

  app.use((req, res) => {
    res.status(503).send('Wrong API Endpoint')
  })
}
