import request from 'services/graphql'

export const PRESET_FRAGMENT = `
  contentType,
  parameters
`
export default {
  async get(token, identifier, contentType) {

    const body = await request(`
      query getPreset($token: String!, $identifier: String!, $contentType: String!) {
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
  async update(token, identifier, preset) {
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
      identifier,
      contentType: preset.contentType,
      preset
    })
    return  body.session.account.project.preset

  },
  async remove(token, identifier, preset) {
    const body = await request(`
      query removePreset($token: String!, $identifier: String!, $contentType: String!, $preset: PresetStruct!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              preset (contentType: $contentType){
                _destroy
              }

            }
          }
        }
      }
    `, {
      token,
      identifier,
      contentType: preset.contentType,
      preset
    })
    return  body.session.account.project.preset
  }
}
