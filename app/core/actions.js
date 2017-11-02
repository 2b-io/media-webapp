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
