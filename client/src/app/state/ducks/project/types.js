import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('project')

export const CREATE = prefix('CREATE')
export const CREATE_COMPLETED = prefix('CREATE_COMPLETED')
export const CREATE_FAILED = prefix('CREATE_FAILED')

export const DELETE = prefix('DELETE')
export const DELETE_COMPLETED = prefix('DELETE_COMPLETED')
export const DELETE_FAILED = prefix('DELETE_FAILED')

export const FETCH = prefix('FETCH')
export const FETCH_COMPLETED = prefix('FETCH_COMPLETED')
export const FETCH_FAILED = prefix('FETCH_FAILED')

export const GET = prefix('GET')
export const GET_COMPLETED = prefix('GET_COMPLETED')
export const GET_FAILED = prefix('GET_FAILED')

export const UPDATE = prefix('UPDATE')
export const UPDATE_COMPLETED = prefix('UPDATE_COMPLETED')
export const UPDATE_FAILED = prefix('UPDATE_FAILED')

export const CREATE_PRESET = prefix('CREATE_PRESET')
export const CREATE_PRESET_COMPLETED = prefix('CREATE_PRESET_COMPLETED')
export const CREATE_PRESET_FAILED = prefix('CREATE_PRESET_FAILED')

export const DELETE_PRESET = prefix('DELETE_PRESET')
export const DELETE_PRESET_COMPLETED = prefix('DELETE_PRESET_COMPLETED')
export const DELETE_PRESET_FAILED = prefix('DELETE_PRESET_FAILED')

export const GET_PRESET = prefix('GET_PRESET')
export const GET_PRESET_COMPLETED = prefix('GET_PRESET_COMPLETED')
export const GET_PRESET_FAILED = prefix('GET_PRESET_FAILED')

export const UPDATE_PRESET = prefix('UPDATE_PRESET')
export const UPDATE_PRESET_COMPLETED = prefix('UPDATE_PRESET_COMPLETED')
export const UPDATE_PRESET_FAILED = prefix('UPDATE_PRESET_FAILED')

export const INVITE_COLLABORATOR = prefix('INVITE_COLLABORATOR')
export const INVITE_COLLABORATOR_COMPLETED = prefix('INVITE_COLLABORATOR_COMPLETED')
export const INVITE_COLLABORATOR_FAILED = prefix('INVITE_COLLABORATOR_FAILED')

export const DELETE_COLLABORATOR = prefix('DELETE_COLLABORATOR')
export const DELETE_COLLABORATOR_COMPLETED = prefix('DELETE_COLLABORATOR_COMPLETED')
export const DELETE_COLLABORATOR_FAILED = prefix('DELETE_COLLABORATOR_FAILED')

export const MAKE_OWNER = prefix('MAKE_OWNER')
export const MAKE_OWNER_COMPLETED = prefix('MAKE_OWNER_COMPLETED')
export const MAKE_OWNER_FAILED = prefix('MAKE_OWNER_FAILED')

export const INVALIDATE_CACHE = prefix('INVALIDATE_CACHE')
export const INVALIDATE_CACHE_COMPLETED = prefix('INVALIDATE_CACHE_COMPLETED')
export const INVALIDATE_CACHE_FAILED = prefix('INVALIDATE_CACHE_FAILED')

export const INVALIDATE_ALL_CACHE = prefix('INVALIDATE_ALL_CACHE')
export const INVALIDATE_ALL_CACHE_COMPLETED = prefix('INVALIDATE_ALL_CACHE_COMPLETED')
export const INVALIDATE_ALL_CACHE_FAILED = prefix('INVALIDATE_ALL_CACHE_FAILED')
