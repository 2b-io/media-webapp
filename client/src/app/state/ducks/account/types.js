import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('account')

export const REGISTER = prefix('REGISTER')
export const REGISTER_COMPLETED = prefix('REGISTER_COMPLETED')
export const REGISTER_FAILED = prefix('REGISTER_FAILED')
