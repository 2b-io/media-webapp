import request from 'services/graphql'
import { PROJECT_FRAGMENT } from './project'
import { USAGE_REPORT_FRAGMENT } from './metric'

export default {
  async get(params, options) {
    const { token } = options

    const body = await request(`
      query get($token: String!, $startTime: Float!, $endTime: Float! ,$period: Float!) {
        session(token: $token) {
          account {
            pinnedProjects {
              identifier
              bytesDownloaded: metric(name: "BYTES_DOWNLOADED") {
                name,
                datapoints(startTime: $startTime, endTime: $endTime, period: $period) {
                  ${ USAGE_REPORT_FRAGMENT }
                }
              },
              requests: metric(name: "REQUESTS") {
                name,
                datapoints(startTime: $startTime, endTime: $endTime, period: $period) {
                  ${ USAGE_REPORT_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, {
      token,
      startTime,
      endTime,
      period
    })

    return body.session.account.pinnedProjects
  },
  async update(params, options) {
    const { projectIdentifiers } = params
    const { token } = options

    const body = await request(`
      query update($token: String!, $projectIdentifiers: [ String ]!) {
        session(token: $token) {
          account {
            _pinProjects(projectIdentifiers: $projectIdentifiers) {
              ${ PROJECT_FRAGMENT }
            }
          }
        }
      }
    `, {
      token,
      projectIdentifiers
    })

    return body.session.account._pinProjects
  }
}
