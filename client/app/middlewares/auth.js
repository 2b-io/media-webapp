import nprogress from 'nprogress'
import { ROUTING, redirect } from 'actions/routing'
import { SESSION, verifySession } from 'actions/session'
import { head } from 'services/rest'

nprogress.configure({ showSpinner: false })

const select = state => select => select(state)

function checkPermission(pathname, token, done, reject) {
  if (pathname === '/dashboard') {
    return token ? done() : reject()
  }

  done()
}

export default [
  store => next => action => {
    if (action.type !== ROUTING.REQUEST) {
      return next(action)
    }

    const selectState = select(store.getState())
    const token = selectState(state => state.app.session.token)

    if (!token) {
      return checkPermission(action.payload.pathname, null,
        () => next(action),
        () => next({
          type: ROUTING.REJECT,
          payload: action.payload
        })
      )
    }

    head({
      url: '/api/sessions'
    }, {
      token
    })
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
