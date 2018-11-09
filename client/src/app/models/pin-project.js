import request from 'services/graphql'
import { PROJECT_FRAGMENT } from './project'

export default {
  async get(params, options) {
    const { token } = options

    const body = await request(`
      query get($token: String!) {
        session(token: $token) {
          account {
            projectPins {
              ${ PROJECT_FRAGMENT }
            }
          }
        }
      }
    `, {
      token
    })

    return body.session.account.projectPins
  },
  async update(params, options) {
    const { projectIdentifiers } = params
    const { token } = options

    const body = await request(`
      query update($token: String!, $projectIdentifiers: projectIdentifiers!) {
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
