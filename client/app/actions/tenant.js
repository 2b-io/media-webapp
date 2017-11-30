import prefix from 'helpers/prefix-map'

export const TENANT = prefix('tenant', {
  REGISTER_TENANT_REQUEST: 'REGISTER_TENANT_REQUEST'
})

export function registerTenant(data) {
  return {
    type: TENANT.REGISTER_TENANT_REQUEST,
    payload: {
      ...data
    }
  }
}
