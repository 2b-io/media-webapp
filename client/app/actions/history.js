import prefix from 'helpers/prefix-map'

export const HISTORY = prefix('HISTORY', {
  PUSH: 'PUSH',
  POP: 'POP',
  CHANGED: 'CHANGED'
})

export function informHistoryPopManually(pathname) {
  return {
    type: HISTORY.POP,
    pathname
  }
}

export function pushHistory(pathname) {
  return {
    type: HISTORY.CHANGED,
    method: 'push',
    pathname
  }
}

export function popHistory(pathname) {
  return {
    type: HISTORY.CHANGED,
    method: 'pop',
    pathname
  }
}

export function replaceHistory(pathname) {
  return {
    type: HISTORY.CHANGED,
    method: 'replace',
    pathname
  }
}

export function getSession() {
  return {
    type: 'GET_SESSION'
  }
}
