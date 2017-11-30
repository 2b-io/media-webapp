import {
  list as listAllTenants,
  register as registerTenant
} from 'services/tenant'

export function list(req, res, next) {
  listAllTenants()
    .then(tenants => {
      res.json(tenants)
    })
    .catch(e => next(e))
}

export function create(req, res, next) {
  const { name, slug, email } = req.body

  registerTenant({
      name,
      slug,
      email
    })
    .then(tenant => {
      res.status(201).json(tenant)
    })
    .catch(e => {
      res.status(500).json(e)
    })
}

