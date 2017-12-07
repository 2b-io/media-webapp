import { ajax, ignore } from 'helpers/ajax'
import prefix from 'helpers/prefix-map'

import { KEYWORDS } from 'actions/ajax'

export const SESSION = prefix('session', {
  ...ajax('CREATE'),
  ...ajax('DESTROY'),
  ...ajax('VERIFY')
})

export function verifySession() {
  return {
    ...ignore(SESSION.VERIFY_REQUEST)
  }
}

export function signIn(credential) {
  return {
    type: SESSION.CREATE_REQUEST,
    payload: credential
  }
}

export function signOut(credential) {
  return {
    type: SESSION.DESTROY_REQUEST,
  }
}

