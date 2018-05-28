import delay from 'delay'
import { call, fork, put, race, take } from 'redux-saga/effects'
import { actions, types } from 'state/interface'

const redirect = function*(pathname) {
  yield fork(processRedirect, pathname)
}

const processRedirect = function*(pathname) {
  try {
    // TODO call API to check permission here

    yield put(actions.acceptLocation(pathname))
  } catch (e) {
    yield put(actions.rejectLocation(pathname))
  }
}

export default function*() {
  const initAction = yield take(types['LOCATION/INIT'])

  yield call(delay, 2e3)

  yield fork(
    put, actions.requestLocation(initAction.payload.pathname)
  )

  while (true) {
    const request = yield take(types['LOCATION/REQUEST'])

    yield redirect(request.payload.pathname)

    const { accept, reject } = yield race({
      accept: take(types['LOCATION/ACCEPT']),
      reject: take(types['LOCATION/REJECT'])
    })

    if (reject) {
      console.log('xxx')
    }
  }
}
