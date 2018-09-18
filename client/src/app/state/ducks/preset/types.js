import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('preset')

export const CREATE = prefix('CREATE')
export const CREATE_COMPLETED = prefix('CREATE_COMPLETED')
export const CREATE_FAILED = prefix('CREATE_FAILED')

export const GET = prefix('GET')
export const GET_COMPLETED = prefix('GET_COMPLETED')
export const GET_FAILED = prefix('GET_FAILED')

export const UPDATE = prefix('UPDATE')
export const UPDATE_COMPLETED = prefix('UPDATE_COMPLETED')
export const UPDATE_FAILED = prefix('UPDATE_FAILED')

export const REMOVE = prefix('REMOVE')
export const REMOVE_COMPLETED = prefix('REMOVE_COMPLETED')
export const REMOVE_FAILED = prefix('REMOVE_FAILED')
