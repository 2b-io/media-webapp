import request from 'services/graphql'

export const SECRET_KEY_FRAGMENT = `
  key,
  description,
  isActive,
`
export default {
  async create(token, identifier) {
    const body = await request(`
      query createSecretKey($token: String!, $identifier: String!) {
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
    `, { token, identifier })

    return body.session.account.project.pushSetting._createSecretKey
  },
  async fetch(token, identifier) {
    const body = await request(`
      query listSecretKeys($token: String!, $identifier: String!) {
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
    `, { token, identifier })

    return body.session.account.project.pushSetting.secretKeys
  },
  async get(token, identifier, key) {
    const body = await request(`
      query getSecretKey($token: String!, $identifier: String!, $key: String!) {
        session(token: $token) {
          account {
            project(identifier: $identifier) {
              pushSetting {
                secretKey(key: $key) {
                  ${ SECRET_KEY_FRAGMENT }
                }
              }
            }
          }
        }
      }
    `, { token, identifier, key })

    return body.session.account.project.pushSetting.secretKey

  },
  async update(token, identifier, secretKey) {
    const body = await request(`
      query updateSecretKey($token: String!, $identifier: String!, $key: String!, $secretKey: SecretKeyStruct!) {
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
      token,
      identifier,
      key: secretKey.key,
      secretKey
    })

    return body.session.account.project.pushSetting.secretKey._update
  },
  async remove(token, identifier, key) {
    const body = await request(`
      query updateSecretKey($token: String!, $identifier: String!, $key: String!) {
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
      token,
      identifier,
      key
    })

    return body.session.account.project.pushSetting.secretKey._destroy
  }
}
