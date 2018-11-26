import request from 'services/graphql'

import { stringToList } from 'services/string-to-list'

export const INVALIDATION_FRAGMENT = `
  identifier,
  status
`

export default {
  async list(params, options) {
    const {
      projectIdentifier
    } = params
    const { token } = options

    const body = await request(`
      query listInvalidateCache($token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              invalidation {
                ${ INVALIDATION_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      token,
      identifier: projectIdentifier
    })

    return body.session.account.project.invalidation
  },
  async invalidateCache(params, options) {
    const { projectIdentifier, patterns } = params
    const { token } = options

    const body = await request(`
      query invalidateCache($token: String!, $identifier: String!, $patterns: [String]!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _invalidateCache(patterns: $patterns){
                ${ INVALIDATION_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      identifier: projectIdentifier,
      patterns: stringToList(patterns),
      token
    })

    return body.session.account.project._invalidateCache
  }
}
