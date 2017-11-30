import prefix from 'helpers/prefix-map'

export const SESSION = prefix('session', {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  VERIFY_REQUEST: 'VERIFY_REQUEST',
  VERIFY_FAILURE: 'VERIFY_FAILURE',
  VERIFY_SUCCESS: 'VERIFY_SUCCESS'
})

export function verifySession() {
  return {
    type: SESSION.VERIFY_REQUEST
  }
}

export function signInRequest(credential) {
  return {
    type: SESSION.SIGN_IN_REQUEST,
    payload: credential
  }
}
