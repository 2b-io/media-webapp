import typePrefix from 'state/helpers/type-prefix'

const prefix = typePrefix('usageReport')

export const GENERATE_REPORT = prefix('GENERATE_REPORT')
export const GENERATE_REPORT_COMPLETED = prefix('GENERATE_REPORT_COMPLETED')
export const GENERATE_REPORT_FAILED = prefix('GENERATE_REPORT_FAILED')
