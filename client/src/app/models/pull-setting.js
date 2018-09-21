import request from 'services/graphql'

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

    const { pullSetting } = body.session.account.project

    return {
      ...pullSetting,
      allowedOrigins: pullSetting.allowedOrigins.join('\n')
    }
  },
  async updatePullSetting(token, identifier, pullSetting) {
    /*
    regex to describes a pattern of character:
      \s* Find multi space, multi tab and multi newline
      [,\n+] Find any character between the brackets
    */
    const delimiter = /\s*[,\n+]\s*/
    const allowedOrigins = (pullSetting.allowedOrigins || '').trim().split(delimiter).filter(Boolean)

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

    const updatedProject = body.session.account.project.pullSetting._update

    return {
      ...updatedProject,
      allowedOrigins: updatedProject.allowedOrigins.join('\n')
    }
  },
}
