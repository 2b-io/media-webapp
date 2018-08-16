import prefix from 'helpers/prefix-map'

export const LAYOUT = prefix('layout', {
  CHANGE: 'CHANGE',
  PERSONAL_MODE: 'PERSONAL',
  FULLSCREEN_MODE: 'FULLSCREEN',
  SYSTEM_MODE: 'SYSTEM'
})

export function changeLayout(mode) {
  return {
    type: LAYOUT.CHANGE,
    payload: {
      mode
    }
  }
}
