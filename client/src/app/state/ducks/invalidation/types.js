import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('invalidation')

export const LIST_INVALIDATE_CACHE = prefix('LIST_INVALIDATE_CACHE')
export const LIST_INVALIDATE_CACHE_COMPLETED = prefix('LIST_INVALIDATE_CACHE_COMPLETED')
export const LIST_INVALIDATE_CACHE_FAILED = prefix('LIST_INVALIDATE_CACHE_FAILED')

export const INVALIDATE_CACHE = prefix('INVALIDATE_CACHE')
export const INVALIDATE_CACHE_COMPLETED = prefix('INVALIDATE_CACHE_COMPLETED')
export const INVALIDATE_CACHE_FAILED = prefix('INVALIDATE_CACHE_FAILED')
