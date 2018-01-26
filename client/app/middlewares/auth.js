import nprogress from 'nprogress'
import pathToRegexp from 'path-to-regexp'

import { ROUTING, redirect } from 'actions/routing'
import { head } from 'services/rest'
import Session from 'models/session'

nprogress.configure({ showSpinner: false })
const select = state => select => select(state)

const PRIVATE_ROUTES = [
  '/dashboard',
  '/profile',
  '/projects/:action',
  '/projects/:action/:slug'
]

function requiresAuthentication(pathname) {
  const matched = PRIVATE_ROUTES.some(route => {
    const regex = pathToRegexp(route)

    return !!regex.exec(pathname)
  })

  return matched
}

function checkPermission(pathname, token, done, reject) {
  if (!requiresAuthentication(pathname)) {
    return done()
  }

  return token ? done() : reject()
}

export default [
  store => next => action => {
    if (action.type === ROUTING.ACCEPT) {
      nprogress.done()
    }

    if (action.type !== ROUTING.REQUEST) {
      return next(action)
    }

    nprogress.start()

    const selectState = select(store.getState())
    const token = selectState(state => state.domain.session.token)

    if (!token) {
      return checkPermission(action.payload.pathname, null,
        () => next(action),
        () => next({
          type: ROUTING.REJECT,
          payload: action.payload
        })
      )
    }

    Session.verify(token)
      .then(() => {
        checkPermission(action.payload.pathname, token,
          () => next(action),
          () => next({
            type: ROUTING.REJECT,
            payload: action.payload
          })
        )
      })
      .catch(error => {
        checkPermission(action.payload.pathname, null,
          () => next(action),
          () => next({
            type: ROUTING.REJECT,
            payload: action.payload
          })
        )
      })
  }
]
