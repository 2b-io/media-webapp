import request from 'graphql-request'

export const create = async (credential) => {
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
    credential: credential
  })

  return body._createSession
}
