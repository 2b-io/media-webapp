import request from 'services/graphql'

export const SECRET_KEY_FRAGMENT = `
  key,
  description,
  isActive,
`
export const PUSH_SETTING_FRAGMENT = `
  secretKeys {
    ${ SECRET_KEY_FRAGMENT }
  }
`
export default {
  async getPushSetting(token, identifier) {
    const body = await request(`
      query getProject($token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pushSetting {
                ${ PUSH_SETTING_FRAGMENT }
              }
            }
          }
        }
      }
    `, { token, identifier })

    return body.session.account.project.pushSetting

  },
  async updatePushSetting(token, identifier, pushSetting) {

    const body = await request(`
      query updateProject($pushSetting: PushSettingStruct!, $token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pushSetting {
                _update(pushSetting: $pushSetting) {
                  ${ PUSH_SETTING_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, {
      token,
      identifier,
      pushSetting
    })

    return body.session.account.project.pushSetting._update
  }
}
