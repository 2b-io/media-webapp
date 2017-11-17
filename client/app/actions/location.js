import prefix from 'helpers/prefix-map'

export const LOCATION = prefix('location', {
  PUSH: 'PUSH',
  POP: 'POP',
  CHANGED: 'CHANGED'
})

export function informHistoryPopManually(pathname) {
  return {
    type: LOCATION.POP,
    pathname
  }
}

export function pushHistory(pathname) {
  return {
    type: LOCATION.CHANGED,
    method: 'push',
    pathname
  }
}

export function popHistory(pathname) {
  return {
    type: LOCATION.CHANGED,
    method: 'pop',
    pathname
  }
}

export function replaceHistory(pathname) {
  return {
    type: LOCATION.CHANGED,
    method: 'replace',
    pathname
  }
}

export function redirect(pathname) {
  return {
    type: LOCATION.PUSH,
    pathname
  }
}
