import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('session')

export const CREATE = prefix('CREATE')
export const CREATE_COMPLETED = prefix('CREATE_COMPLETED')
export const CREATE_FAILED = prefix('CREATE_FAILED')

export const DESTROY = prefix('DESTROY')
export const DESTROY_COMPLETED = prefix('DESTROY_COMPLETED')
export const DESTROY_FAILED = prefix('DESTROY_FAILED')
