import Bluebird from 'bluebird'
import Tenant from 'models/Tenant'
import User from 'models/User'

export function list() {
  return Tenant.find().lean().exec()
}

export function register(tenantInfo) {
  const { name, slug, email } = tenantInfo

  const tenant = new Tenant({
    name,
    slug
  })

  return tenant.save()
    .then(tenant => {
      const user = new User({
        tenant: tenant._id,
        email: email,
        superUser: true
      })

      return Bluebird.all([
        tenant,
        user.save()
      ])
    }).spread((tenant, user) => {
      return tenant
    })
}
