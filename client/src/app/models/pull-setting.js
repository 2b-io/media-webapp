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
  async getPullSetting(token, identifier) {
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
    `, { token, identifier })

    const pullSetting = body.session.account.project.pullSetting

    return {
      ...pullSetting,
      allowedOrigins: pullSetting.allowedOrigins.join('\n'),
      headers: [ ...(pullSetting.headers || []), {} ]
    }
  },
  async updatePullSetting(token, identifier, pullSetting) {

    const allowedOrigins = stringToList(pullSetting.allowedOrigins)

    const { headers } = pullSetting
    const _headers = headers.filter(({ name, value }) => name && value)

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
      token,
      identifier,
      pullSetting: {
        ...pullSetting,
        allowedOrigins,
        headers: _headers
      }
    })

    const updatedPullSetting = body.session.account.project.pullSetting._update

    return {
      ...updatedPullSetting,
      allowedOrigins: listToString(updatedPullSetting.allowedOrigins),
      headers: [ ...(updatedPullSetting.headers || []), {} ]
    }
  },
}
