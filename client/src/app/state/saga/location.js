import delay from 'delay'
import { call, fork, put, select, take } from 'redux-saga/effects'
import { actions, selectors, types } from 'state/interface'

const UNAUTH_PATHNAMES = [ '/sign-in', '/sign-up' ]
const AUTH_PATHNAMES = [ '/' ]

const loop = function*() {
  while (true) {
    const request = yield take(types['LOCATION/REQUEST'])

    const pathname = request.payload.pathname

    try {
      // TODO call API to check permission here
      if (pathname === '/splash') {
        throw new Error('Invalid pathname')
      }

      const isSignedIn = yield select(selectors.isSignedIn)

      if (isSignedIn) {
        if (UNAUTH_PATHNAMES.includes(pathname)) {
          yield fork(put, actions.acceptLocation('/'))

          continue
        }
      } else {
        if (AUTH_PATHNAMES.includes(pathname)) {
          yield fork(put, actions.acceptLocation('/sign-in'))

          continue
        }
      }

      yield fork(put, actions.acceptLocation(pathname))
    } catch (error) {
      yield fork(put, actions.rejectLocation(pathname, error))
    }
  }
}

export default function*() {
  yield fork(loop)

  const initAction = yield take(types['LOCATION/INIT'])

  yield put(actions.requestLocation(initAction.payload.pathname))

  yield put({
    type: '@@INITIALIZED'
  })
}
