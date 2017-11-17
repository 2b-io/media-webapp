import { call, fork, put, take } from 'redux-saga/effects'

import { PROFILE, setProfile } from 'actions/profile'
import { get } from 'services/rest'

export function* watchProfileFetching() {
  while (true) {
    const action = yield take(PROFILE.FETCH)

    try {
      const profile = yield call(get, action.id)

      yield put(setProfile(profile))
    } catch (e) {
      yield put({ type: 'SET_UNAUTHORIZED_ERROR' })
    }
  }
}

export default function* root() {
  yield fork(watchProfileFetching)
}
