import request from 'services/graphql'

export const SECRET_KEY_FRAGMENT = `
  key,
  isActive
`
export default {
  async create(params, options) {
    const { identifier } = params
    const { token } = options

    const body = await request(`
      query createSecretKey(
        $token: String!,
        $identifier: String!
      ) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pushSetting {
                _createSecretKey {
                  ${ SECRET_KEY_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, {
      identifier,
      token
    })

    return body.session.account.project.pushSetting._createSecretKey
  },
  async fetch(params, options) {
    const { identifier } = params
    const { token } = options

    const body = await request(`
      query listSecretKeys(
        $token: String!,
        $identifier: String!
      ) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pushSetting {
                secretKeys {
                  ${ SECRET_KEY_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, {
      identifier,
      token
    })

    return body.session.account.project.pushSetting.secretKeys
  },
  async update(params, options) {
    const {
      identifier,
      secretKey: { key, isActive }
    } = params
    const { token } = options

    const body = await request(`
      query updateSecretKey(
        $token: String!,
        $identifier: String!,
        $key: String!,
        $secretKey: SecretKeyStruct!
      ) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pushSetting {
                secretKey(key: $key) {
                  _update(secretKey: $secretKey) {
                    ${ SECRET_KEY_FRAGMENT }
                  }
                }
              }
            }
          }
        }
      }
    `, {
      identifier,
      key: key,
      secretKey: { isActive },
      token
    })

    return body.session.account.project.pushSetting.secretKey._update
  },
  async remove(params, options) {
    const { identifier, key } = params
    const { token } = options

    const body = await request(`
      query updateSecretKey(
        $token: String!,
        $identifier: String!,
        $key: String!
      ) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pushSetting {
                secretKey(key: $key) {
                  _destroy
                }
              }
            }
          }
        }
      }
    `, {
      identifier,
      key,
      token
    })

    return body.session.account.project.pushSetting.secretKey._destroy
  }
}
