import pick from 'object.pick'
import request from 'graphql-request'

export default {
  create: async (credential) => {
    const body = await request('/graphql', `
      query signIn($credential: AccountStruct!) {
        _createSession(account: $credential) {
          token,
          ttl,
          account {
            email
          }
        }
      }
    `, {
      credential: pick(credential, [ 'email', 'password' ])
    })

    return body._createSession
  },
  verify: async (token) => {
    const body = await request('/graphql', `
      query verify($token: String!) {
        session(token: $token) {
          token,
          ttl,
          account {
            email
          }
        }
      }
    `, {
      token: token
    })

    return body.session
  },
  refresh: async (token) => {
    const body = await request('/graphql', `
      query refresh($token: String!, $refresh: Boolean) {
        session(token: $token, refresh: $refresh) {
          token,
          ttl,
          account {
            email
          }
        }
      }
    `, {
      token: token,
      refresh: true
    })

    return body.session
  }
}
