import prefix from 'helpers/prefix-map'

export const SESSION = prefix('session', {
  VERIFY: 'VERIFY'
})

export function verifySession() {
  return {
    type: SESSION.VERIFY
  }
}
