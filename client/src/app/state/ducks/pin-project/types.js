import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('pinProject')

export const LIST = prefix('LIST')
export const LIST_COMPLETED = prefix('LIST_COMPLETED')
export const LIST_FAILED = prefix('LIST_FAILED')

export const UPDATE = prefix('UPDATE')
export const UPDATE_COMPLETED = prefix('UPDATE_COMPLETED')
export const UPDATE_FAILED = prefix('UPDATE_FAILED')
