export const init = (pathname) => ({
  type: 'location.init',
  payload: { pathname }
})

export const request = (pathname) => ({
  type: 'location.request',
  payload: { pathname }
})
