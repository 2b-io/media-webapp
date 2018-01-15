import initAccountRoutes from './account'
import initPresetRoutes from './preset'
import initProjectRoutes from './project'
import initSessionRoutes from './session'

export default app => {
  initAccountRoutes(app)
  initPresetRoutes(app)
  initProjectRoutes(app)
  initSessionRoutes(app)

  app.use((req, res) => {
    res.status(503).send('Wrong API Endpoint')
  })
}
