import delay from 'delay'
import { call, fork, put, take } from 'redux-saga/effects'
import { actions, types } from 'state/interface'

export default function*() {
  const initAction = yield take(types['LOCATION/INIT'])

  yield call(delay, 2e3)

  yield fork(
    put, actions.requestLocation(initAction.payload.pathname)
  )

  while (true) {
    const request = yield take(types['LOCATION/REQUEST'])

    const pathname = request.payload.pathname

    try {
      // TODO call API to check permission here
      if (pathname === '/splash') {
        throw new Error('Invalid pathname')
      }

      yield fork(put, actions.acceptLocation(pathname))
    } catch (error) {
      yield fork(put, actions.rejectLocation(pathname, error))
    }
  }
}
