import request from 'services/graphql'

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

    return body.session.account.project.cacheSetting
  },
  async update(params, options) {
    const { identifier, cacheSetting } = params
    const { token } = options

    const body = await request(`
      query updateProject($expired: String!, $token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              cacheSetting {
                _update(cacheSetting: $cacheSetting) {
                  ${ CACHE_SETTING_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, {
      identifier,
      cacheSetting,
      token
    })

    return body.session.account.project.cacheSetting._update
  },
}
