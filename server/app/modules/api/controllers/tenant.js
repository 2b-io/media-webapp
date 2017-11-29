import Tenant from 'models/Tenant'

export function list(req, res, next) {
  Tenant
    .find()
    .lean()
    .exec()
    .then(tenants => {
      res.json(tenants)
    })
    .catch(e => next(e))
}

export function create(req, res, next) {
  res.json({
    blah: 'blah'
  })
}

