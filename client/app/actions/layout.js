import prefix from 'helpers/prefix-map'

export const LAYOUT = prefix('location', {
  CHANGE: 'CHANGE',
  FULLSCREEN_MODE: 'fullscreen',
  SYSTEM_MODE: 'system'
})

export function changeLayout(mode) {
  return {
    type: LAYOUT.CHANGE,
    payload: {
      mode
    }
  }
}
