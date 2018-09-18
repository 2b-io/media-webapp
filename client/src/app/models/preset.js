import request from 'services/graphql'

export const PRESET_FRAGMENT = `
  contentType,
  parameters
`
export default {
  async get(token, identifier, contentType) {

    const body = await request(`
      query getProject($token: String!, $identifier: String!, $contentType: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              preset(contentType: $contentType) {
                ${ PRESET_FRAGMENT }
              }
            }
          }
        }
      }
    `, { token, identifier, contentType })
    return body.session.account.project.preset
  },
  async update(token, preset) {
    const { identifier, ...presetStruct } = preset
    const body = await request(`
      query updatePreset($token: String!, $identifier: String!, $contentType: String!, $preset: PresetStruct!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              preset (contentType: $contentType){
                _update(preset: $preset) {
                  ${ PRESET_FRAGMENT }
                }
              }

            }
          }
        }
      }
    `, {
      token,
      identifier: preset.identifier,
      contentType: preset.contentType,
      preset: presetStruct
    })
    return  body.session.account.project.preset

  },
}
