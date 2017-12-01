import prefix from 'helpers/prefix-map'

export const SESSION = prefix('session', {
  INIT_SUCCESS: 'INIT_SUCCESS',
  CREATE_REQUEST: 'CREATE_REQUEST',
  CREATE_FAILURE: 'CREATE_FAILURE',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  DESTROY_REQUEST: 'DESTROY_REQUEST',
  DESTROY_FAILURE: 'DESTROY_FAILURE',
  DESTROY_SUCCESS: 'DESTROY_SUCCESS',
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
    type: SESSION.CREATE_REQUEST,
    payload: credential
  }
}

export function signOutRequest(credential) {
  return {
    type: SESSION.DESTROY_REQUEST,
  }
}

