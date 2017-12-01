import prefix from 'helpers/prefix-map'

export const TENANT = prefix('tenant', {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE'
})

export function registerTenant(data) {
  return {
    type: TENANT.REGISTER_REQUEST,
    payload: {
      ...data
    }
  }
}
