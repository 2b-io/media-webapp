import request from 'services/graphql'
import { listToString, stringToList } from 'services/string-to-list'

export const HEADER_FRAGMENT = `
  name,
  value
`
export const PULL_SETTING_FRAGMENT = `
  pullURL,
  allowedOrigins,
  headers {
    ${ HEADER_FRAGMENT }
  }
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
              pullSetting {
                ${ PULL_SETTING_FRAGMENT }
              }
            }
          }
        }
      }
    `, {
      identifier,
      token
    })

    const pullSetting = body.session.account.project.pullSetting

    return {
      ...pullSetting,
      allowedOrigins: listToString(pullSetting.allowedOrigins),
      headers: [ ...(pullSetting.headers || []), {} ]
    }
  },
  async update(params, options) {
    const { identifier, pullSetting } = params
    const { token } = options

    const body = await request(`
      query updateProject($pullSetting: PullSettingStruct!, $token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pullSetting {
                _update(pullSetting: $pullSetting) {
                  ${ PULL_SETTING_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, {
      identifier,
      pullSetting: {
        ...pullSetting,
        allowedOrigins: stringToList(pullSetting.allowedOrigins),
        headers: pullSetting.headers.filter(
          ({ name, value }) => name && value
        )
      },
      token
    })

    const updatedPullSetting = body.session.account.project.pullSetting._update

    return {
      ...updatedPullSetting,
      allowedOrigins: listToString(updatedPullSetting.allowedOrigins),
      headers: [ ...(updatedPullSetting.headers || []), {} ]
    }
  },
}
