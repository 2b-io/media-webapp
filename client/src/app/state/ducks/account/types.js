import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('account')

export const CHANGE_PASSWORD = prefix('CHANGE_PASSWORD')
export const CHANGE_PASSWORD_COMPLETED = prefix('CHANGE_PASSWORD_COMPLETED')
export const CHANGE_PASSWORD_FAILED = prefix('CHANGE_PASSWORD_FAILED')

export const GET = prefix('GET')
export const GET_COMPLETED = prefix('GET_COMPLETED')
export const GET_FAILED = prefix('GET_FAILED')

export const REGISTER = prefix('REGISTER')
export const REGISTER_COMPLETED = prefix('REGISTER_COMPLETED')
export const REGISTER_FAILED = prefix('REGISTER_FAILED')

export const SEARCH_ACCOUNT = prefix('SEARCH_ACCOUNT')
export const SEARCH_ACCOUNT_COMPLETED = prefix('SEARCH_ACCOUNT_COMPLETED')
export const SEARCH_ACCOUNT_FAILED = prefix('SEARCH_ACCOUNT_FAILED')

export const UPDATE = prefix('UPDATE')
export const UPDATE_COMPLETED = prefix('UPDATE_COMPLETED')
export const UPDATE_FAILED = prefix('UPDATE_FAILED')
