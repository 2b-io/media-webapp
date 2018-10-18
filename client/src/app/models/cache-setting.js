import request from 'services/graphql'
import { stringToList } from 'services/string-to-list'

export const CACHE_SETTING_FRAGMENT = `
  expired
`

export default {
  async get(params, options) {
    const { identifier } = params
    const { token } = options

    const body = await request(`
      query getProject($token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              cacheSetting {
                ${ CACHE_SETTING_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      identifier,
      token
    })

    const cacheSetting = body.session.account.project.cacheSetting

    return {
      ...cacheSetting
    }
  },
  async update(params, options) {
    const { identifier, expired } = params
    const { token } = options

    const body = await request(`
      query updateProject($expired: String!, $token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              cacheSetting {
                _update(expired: $expired) {
                  ${ CACHE_SETTING_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, {
      identifier,
      expired,
      token
    })

    const updatedCacheSetting = body.session.account.project.cacheSetting._update

    return {
      ...updatedPullSetting
    }
  },
}
