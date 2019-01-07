import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('reports')

export const GENERATE_USAGE_REPORT = prefix('GENERATE_USAGE_REPORT')
export const GENERATE_USAGE_REPORT_COMPLETED = prefix('GENERATE_USAGE_REPORT_COMPLETED')
export const GENERATE_USAGE_REPORT_FAILED = prefix('GENERATE_USAGE_REPORT_FAILED')

export const GENERATE_CDN_REPORT = prefix('GENERATE_CDN_REPORT')
export const GENERATE_CDN_REPORT_COMPLETED = prefix('GENERATE_CDN_REPORT_COMPLETED')
export const GENERATE_CDN_REPORT_FAILED = prefix('GENERATE_CDN_REPORT_FAILED')
