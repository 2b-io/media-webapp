import HISTORY from 'components/History/actions'

export function redirect(pathname) {
  return {
    type: HISTORY.PUSH,
    pathname
  }
}

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
