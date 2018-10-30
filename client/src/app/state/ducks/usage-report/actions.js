import * as types from './types'

export const generateReport = (data) => ({
  type: types.GENERATE_REPORT,
  payload: { data }
})

export const generateReportCompleted = (data, period) => ({
  type: types.GENERATE_REPORT_COMPLETED,
  payload: { data, period }
})

export const generateReportFailed = reason => ({
  type: types.GENERATE_REPORT_FAILED,
  payload: { reason }
})
