import * as types from './types'

export const generateUsageReport = (data) => ({
  type: types.GENERATE_USAGE_REPORT,
  payload: { data }
})

export const generateUsageReportCompleted = (data, period, requestData, usageData) => ({
  type: types.GENERATE_USAGE_REPORT_COMPLETED,
  payload: { data, period, requestData, usageData }
})

export const generateUsageReportFailed = reason => ({
  type: types.GENERATE_USAGE_REPORT_FAILED,
  payload: { reason }
})
