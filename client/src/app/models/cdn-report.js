import request from 'services/graphql'

export const CDN_REPORT_FRAGMENT = `
  timestamp,
  value
`

export default {
  async generateCdnReport(params, options) {
    const {
      endTime,
      period,
      projectIdentifier,
      startTime
    } = params
    const { token } = options

    const body = await request(`
      query generateCdnReport($token: String!, $projectIdentifier: String!, $startTime: Float!, $endTime: Float! ,$period: Float!) {
        session(token: $token) {
          account {
            project(identifier: $projectIdentifier) {
              timeConsumed: metric(name: "TIME_CONSUMED") {
                name,
                datapoints(startTime: $startTime, endTime: $endTime, period: $period) {
                  ${ CDN_REPORT_FRAGMENT }
                }
              },
              requests: metric(name: "CDN_REQUESTS") {
                name,
                datapoints(startTime: $startTime, endTime: $endTime, period: $period) {
                  ${ CDN_REPORT_FRAGMENT }
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
