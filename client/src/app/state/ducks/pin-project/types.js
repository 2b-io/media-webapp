import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('pinProject')

export const FETCH = prefix('FETCH')
export const FETCH_COMPLETED = prefix('FETCH_COMPLETED')
export const FETCH_FAILED = prefix('FETCH_FAILED')

export const UPDATE = prefix('UPDATE')
export const UPDATE_COMPLETED = prefix('UPDATE_COMPLETED')
export const UPDATE_FAILED = prefix('UPDATE_FAILED')
