import request from 'services/graphql'

export const PRESET_FRAGMENT = `
  contentType,
  parameters,
  isActive
`
export default {
  async fetch(token, identifier) {

    const body = await request(`
      query fetchPresets($token: String!, $identifier: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              presets {
                ${ PRESET_FRAGMENT }
              }
            }
          }
        }
      }
    `, { token, identifier })
    return body.session.account.project.presets
  },
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
  },
  async create(token, identifier, contentType) {
    const body = await request(`
      query getPreset($token: String!, $identifier: String!, $preset: PresetStruct!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              _createPreset(preset: $preset) {
                ${ PRESET_FRAGMENT }
              }
            }
          }
        }
      }
    `, { token, identifier, preset: { contentType } })
    return body.session.account.project._createPreset
  }
}
