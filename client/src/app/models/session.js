import pick from 'object.pick'
import request from 'services/graphql'

const SESSION_FRAGMENT = `
  token,
  ttl,
  account {
    email
  }
`

export default {
  create: async (credential) => {
    const body = await request(`
      query signIn($credential: AccountStruct!) {
        _createSession(account: $credential) {
          ${SESSION_FRAGMENT}
        }
      }
    `, {
      credential: pick(credential, [ 'email', 'password' ])
    })

    return body._createSession
  },
  verify: async (token) => {
    const body = await request(`
      query verify($token: String!) {
        session(token: $token) {
          ${SESSION_FRAGMENT}
        }
      }
    `, {
      token
    })

    return body.session
  },
  refresh: async (token) => {
    const body = await request(`
      query refresh($token: String!, $refresh: Boolean) {
        session(token: $token, refresh: $refresh) {
          ${SESSION_FRAGMENT}
        }
      }
    `, {
      token,
      refresh: true
    })

    return body.session
  }
}
