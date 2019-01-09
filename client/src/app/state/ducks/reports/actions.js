import * as types from './types'

export const generateUsageReport = (data) => ({
  type: types.GENERATE_USAGE_REPORT,
  payload: { data }
})

export const generateUsageReportCompleted = (data, period) => ({
  type: types.GENERATE_USAGE_REPORT_COMPLETED,
  payload: { data, period }
})

export const generateUsageReportFailed = reason => ({
  type: types.GENERATE_USAGE_REPORT_FAILED,
  payload: { reason }
})

export const generateCdnReport = (data) => ({
  type: types.GENERATE_CDN_REPORT,
  payload: { data }
})

export const generateCdnReportCompleted = (data, period, requestData, timeConsumedData) => ({
  type: types.GENERATE_CDN_REPORT_COMPLETED,
  payload: { data, period, requestData, timeConsumedData }
})

export const generateCdnReportFailed = reason => ({
  type: types.GENERATE_CDN_REPORT_FAILED,
  payload: { reason }
})
