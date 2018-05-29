import delay from 'delay'
import { call, fork, put, take } from 'redux-saga/effects'
import { actions, types } from 'state/interface'

const loop = function*() {
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

export default function*() {
  yield fork(loop)

  const initAction = yield take(types['LOCATION/INIT'])

  yield put(actions.requestLocation(initAction.payload.pathname))

  yield put({
    type: '@@initialized'
  })
}
