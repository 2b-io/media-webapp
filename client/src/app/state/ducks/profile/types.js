import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('changePassword')

export const FETCH_PASSWORD = prefix('FETCH_PASSWORD')
export const FETCH_PASSWORD_COMPLETED = prefix('FETCH_PASSWORD_COMPLETED')
export const FETCH_PASSWORDFAILED = prefix('FETCH_PASSWORD_FAILED')
