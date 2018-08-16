import prefix from 'helpers/prefix-map'

export const ROUTING = prefix('routing', {
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  REQUEST: 'REQUEST',
  MATCH: 'MATCH'
})

export function redirect(pathname, state) {
  return {
    type: ROUTING.REQUEST,
    payload: {
      pathname,
      state
    }
  }
}

export function sync(location) {
  return {
    type: ROUTING.SYNC,
    payload: location
  }
}

export function accept(location) {
  return {
    type: ROUTING.ACCEPT,
    payload: location
  }
}
