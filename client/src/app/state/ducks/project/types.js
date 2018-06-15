import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('project')

export const RECEIVE = prefix('RECEIVE')
export const RECEIVE_COMPLETED = prefix('RECEIVE_COMPLETED')
export const RECEIVE_FAILED = prefix('RECEIVE_FAILED')

export const REQUEST = prefix('REQUEST')
export const REQUEST_COMPLETED = prefix('REQUEST_COMPLETED')
export const REQUEST_FAILED = prefix('REQUEST_FAILED')
