import { call, fork, put, select, take } from 'redux-saga/effects'
import { TENANT } from 'actions/tenant'

import { post } from 'services/rest'

export function* watchRegisterTenantRequest() {
  while (true) {
    const action = yield take(TENANT.REGISTER_TENANT_REQUEST)

    const session = yield select(state => state.session)

    console.log(session)

    continue

    try {
      const result = yield call(post, {
        url: '/api/tenants',
        data: action.payload
      })

      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }
}

export default function* root() {
  yield fork(watchRegisterTenantRequest)
}
