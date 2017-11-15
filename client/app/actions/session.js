import prefix from 'helpers/prefix-map'

export const SESSION = prefix('SESSION', {
  VERIFY: 'VERIFY'
})

export function verifySession() {
  return {
    type: SESSION.VERIFY
  }
}
