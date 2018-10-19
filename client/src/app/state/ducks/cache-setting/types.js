import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('cacheSetting')

export const GET = prefix('GET')
export const GET_COMPLETED = prefix('GET_COMPLETED')
export const GET_FAILED = prefix('GET_FAILED')

export const UPDATE = prefix('UPDATE')
export const UPDATE_COMPLETED = prefix('UPDATE_COMPLETED')
export const UPDATE_FAILED = prefix('UPDATE_FAILED')
