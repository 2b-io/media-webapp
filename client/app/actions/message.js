import prefix from 'helpers/prefix-map'

export const MESSAGE = prefix('message', {
  DISMISS: 'DISMISS',
  APPEND: 'APPEND'
})

export function dismiss(key) {
  return {
    type: MESSAGE.DISMISS,
    payload: key
  }
}

export function append(message) {
  return {
    type: MESSAGE.APPEND,
    payload: message
  }
}
