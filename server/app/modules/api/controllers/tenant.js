import slug from 'slug'
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
  const { name } = req.body

  new Tenant({
    name: name,
    slug: slug(name, { lower: true })
  })
  .save()
  .then(tenant => {
    res.status(201).json(tenant)
  })
  .catch(e => {
    res.status(500).json(e)
  })
}

