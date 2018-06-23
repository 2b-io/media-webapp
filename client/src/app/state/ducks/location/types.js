import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('location')

export const ACCEPT = prefix('ACCEPT')
export const INIT = prefix('INIT')
export const REJECT = prefix('REJECT')
export const REQUEST = prefix('REQUEST')
export const UPDATE_KEY = prefix('UPDATE_KEY')
