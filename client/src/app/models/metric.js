import request from 'services/graphql'

export const USAGE_REPORT_FRAGMENT = `
  timestamp,
  value
`

export default {
  async generateUsageReport(params, options) {
    const {
      endTime,
      period,
      projectIdentifier,
      startTime
    } = params
    const { token } = options

    const body = await request(`
      query generateReport($token: String!, $projectIdentifier: String!, $startTime: Float!, $endTime: Float! ,$period: Float!) {
        session(token: $token) {
          account {
            project(identifier: $projectIdentifier) {
              bytesDownloaded: metric(name: "BYTES_DOWNLOADED") {
                name
                datapoints(startTime: $startTime, endTime: $endTime, period: $period) {
                  ${ USAGE_REPORT_FRAGMENT }
                }
              },
              requests: metric(name: "REQUESTS") {
                name
                datapoints(startTime: $startTime, endTime: $endTime, period: $period) {
                  ${ USAGE_REPORT_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, {
      endTime,
      period,
      projectIdentifier,
      startTime,
      token
    })

    return body.session.account.project
  }
}
