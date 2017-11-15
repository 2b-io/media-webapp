import { HISTORY } from 'actions/history'

export function redirect(pathname) {
  return {
    type: HISTORY.PUSH,
    pathname
  }
}
