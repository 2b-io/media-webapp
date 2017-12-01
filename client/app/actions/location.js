import prefix from 'helpers/prefix-map'

export const LOCATION = prefix('location', {
  PUSH: 'PUSH',
  POP: 'POP',
  REPLACE: 'REPLACE',
  CHANGED: 'CHANGED'
})

export function informHistoryPopManually(pathname) {
  return {
    type: LOCATION.POP,
    payload: {
      pathname
    }
  }
}

export function pushHistory(pathname) {
  return {
    type: LOCATION.CHANGED,
    payload: {
      method: 'push',
      pathname
    }
  }
}

export function popHistory(pathname) {
  return {
    type: LOCATION.CHANGED,
    payload: {
      method: 'pop',
      pathname
    }
  }
}

export function replaceHistory(pathname) {
  return {
    type: LOCATION.CHANGED,
    payload: {
      method: 'replace',
      pathname
    }
  }
}

export function redirect(pathname) {
  return {
    type: LOCATION.PUSH,
    payload: {
      pathname
    }
  }
}

export function replace(pathname) {
  return {
    type: LOCATION.REPLACE,
    payload: {
      pathname
    }
  }
}
