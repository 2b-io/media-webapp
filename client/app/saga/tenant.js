import { call, fork, put, select, take } from 'redux-saga/effects'

import { TENANT } from 'actions/tenant'
import { redirect } from 'actions/location'
import { post } from 'services/rest'

export function* registerTenant() {
  while (true) {
    const action = yield take(TENANT.REGISTER_REQUEST)
    const session = yield select(state => state.session)

    try {
      const tenant = yield call(post, {
        url: '/api/tenants',
        data: action.payload
      })

      yield put({
        type: TENANT.REGISTER_SUCCESS,
        payload: tenant
      })
      yield put(redirect('/sign-in'))
    } catch (e) {
      yield put({
        type: TENANT.REGISTER_FAILURE,
        error: e
      })
    }
  }
}

export default function* root() {
  yield fork(registerTenant)
}
