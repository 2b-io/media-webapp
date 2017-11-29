import {
  list as listAllTenants,
  create as createTenant
} from '../controllers/tenant'

export default app => {
  app.get('/tenants', listAllTenants)
  app.post('/tenants', createTenant)
}
