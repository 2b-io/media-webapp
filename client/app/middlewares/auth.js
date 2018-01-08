import nprogress from 'nprogress'
import { ROUTING, redirect } from 'actions/routing'
import { SESSION, verifySession } from 'actions/session'

nprogress.configure({ showSpinner: false })

const select = state => select => select(state)
let verifying = false

console.log('x')

export default [
  store => next => action => {
    if (action.type !== ROUTING.ACCEPT_CHANGE) {
      return next(action)
    }

    const selectState = select(store.getState())

    const token = selectState(state => state.app.session.token)

    if (!token) {
      console.log('not sign in...')
      return next(action)
    }

    console.log('verify token')
    setTimeout(() => {
      console.log('verify token done')

      next(action)
    }, 1e3)
  }
]
