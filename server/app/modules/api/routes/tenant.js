import {
  list as listAllTenants
} from '../controllers/tenant'

export default app => {
  app.get('/tenants', listAllTenants)
}
