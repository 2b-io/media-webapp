import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('resetPasswordCode')

export const FETCH = prefix('FETCH')
export const FETCH_COMPLETED = prefix('FETCH_COMPLETED')
export const FETCH_FAILED = prefix('FETCH_FAILED')
