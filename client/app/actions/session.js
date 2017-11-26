import prefix from 'helpers/prefix-map'

export const SESSION = prefix('session', {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  VERIFY: 'VERIFY'
})

export function verifySession() {
  return {
    type: SESSION.VERIFY
  }
}

export function signInRequest(credential) {
  return {
    type: SESSION.SIGN_IN_REQUEST,
    payload: credential
  }
}
