export const actions = {
  accept: 'location.accept',
  init: 'location.init',
  request: 'location.request'
}

export const accept = (pathname) => ({
  type: actions.accept,
  payload: { pathname }
})

export const init = (pathname) => ({
  type: actions.init,
  payload: { pathname }
})

export const request = (pathname) => ({
  type: action.request,
  payload: { pathname }
})
