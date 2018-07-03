import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('account')

export const CHANGE_PASSWORD = prefix('CHANGE_PASSWORD')
export const CHANGE_PASSWORD_COMPLETED = prefix('CHANGE_PASSWORD_COMPLETED')
export const CHANGE_PASSWORD_FAILED = prefix('CHANGE_PASSWORD_FAILED')

export const REGISTER = prefix('REGISTER')
export const REGISTER_COMPLETED = prefix('REGISTER_COMPLETED')
export const REGISTER_FAILED = prefix('REGISTER_FAILED')
