import { fork, put, select, take } from 'redux-saga/effects'
import url from 'url'

import permissionChecker from 'services/permission-checker'
import { actions, selectors, types } from 'state/interface'

const loop = function*() {
  while (true) {
    const request = yield take(types['LOCATION/REQUEST'])

    const { pathname } = url.parse(request.payload.pathname)

    try {
      const isSignedIn = yield select(selectors.isSignedIn)
      const checker = permissionChecker(isSignedIn)

      if (!checker(pathname)) {
        yield fork(put,
          actions.acceptLocation(
            isSignedIn ? '/' : '/sign-in'
          )
        )

        continue
      }

      // TODO call API to check permission here
      yield fork(put, actions.acceptLocation(request.payload.pathname))

      yield put(actions.minimizeSidebar())
    } catch (error) {
      yield fork(put, actions.rejectLocation(request.payload.pathname, error))
    }
  }
}

export default function*() {
  yield take('@@SESSION/INITIALIZED')

  yield fork(loop)

  const { pathname } = yield select(selectors.currentLocation)

  yield put(actions.requestLocation(pathname))

  yield put({
    type: '@@INITIALIZED'
  })
}
