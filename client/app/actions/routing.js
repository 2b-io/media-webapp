import prefix from 'helpers/prefix-map'

export const ROUTING = prefix('routing', {
  REQUEST_CHANGE: 'REQUEST_CHANGE',
  ACCEPT_CHANGE: 'ACCEPT_CHANGE'
})

export function redirect(pathname, state) {
  return {
    type: ROUTING.REQUEST_CHANGE,
    payload: {
      pathname,
      state
    }
  }
}

export function accept(location) {
  return {
    type: ROUTING.ACCEPT_CHANGE,
    payload: location
  }
}
