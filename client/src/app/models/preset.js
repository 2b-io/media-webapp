import request from 'services/graphql'

export const PRESET_FRAGMENT = `
  contentType,
  isActive,
  parameters
`
export default {
  async fetch(params, options) {
    const { identifier } = params
    const { token } = options

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
    `, {
      identifier,
      token
    })

    return body.session.account.project.presets
  },

  async get(params, options) {
    const { contentType, identifier } = params
    const { token } = options

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
    `, {
      contentType,
      identifier,
      token,
    })

    return body.session.account.project.preset
  },

  async update(params, options) {
    const {
      identifier,
      preset: {
        contentType,
        isActive,
        parameters
      }
    } = params
    const { token } = options

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
      contentType,
      preset: {
        isActive,
        parameters
      }
    })

    return  body.session.account.project.preset._update
  },

  async remove(params, options) {
    const { contentType, identifier } = params
    const { token } = options

    const body = await request(`
      query removePreset($token: String!, $identifier: String!, $contentType: String!) {
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
      contentType,
      identifier,
      token
    })

    return  body.session.account.project.preset._destroy
  },

  async create(params, options) {
    const { contentType, identifier } = params
    const { token } = options

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
    `, {
      identifier,
      preset: {
        contentType,
        isActive: true
      },
      token
    })

    return body.session.account.project._createPreset
  }
}
