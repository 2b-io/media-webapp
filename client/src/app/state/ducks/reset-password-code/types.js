import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('resetPasswordCode')

export const FORGOT_PASSWORD = prefix('FORGOT_PASSWORD')
export const FORGOT_PASSWORD_COMPLETED = prefix('FORGOT_PASSWORD_COMPLETED')
export const FORGOT_PASSWORD_FAILED = prefix('FORGOT_PASSWORD_FAILED')

export const RESET_PASSWORD = prefix('RESET_PASSWORD')
export const RESET_PASSWORD_COMPLETED = prefix('RESET_PASSWORD_COMPLETED')
export const RESET_PASSWORD_FAILED = prefix('RESET_PASSWORD_FAILED')

export const GET_RESET_CODE = prefix('GET_RESET_CODE')
export const GET_RESET_CODE_COMPLETED = prefix('GET_RESET_CODE_COMPLETED')
export const GET_RESET_CODE_FAILED = prefix('GET_RESET_CODE_FAILED')
