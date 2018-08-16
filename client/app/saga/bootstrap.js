import { call, race, take, put } from 'redux-saga/effects'

import { BOOTSTRAP } from 'actions/bootstrap'
import { SESSION, signIn } from 'actions/session'
import { get } from 'services/storage'

const TOKEN_STORAGE_KEY = 'jwt'

export default function* root() {
  yield take(BOOTSTRAP.REQUEST)

  const token = yield call(get, TOKEN_STORAGE_KEY)

  if (token) {
    yield put(signIn({
      refresh: true,
      token: token
    }))

    yield race({
      success: take(SESSION.CREATE_SUCCESS),
      failure: take(SESSION.CREATE_FAILURE)
    })
  }

  yield put({
    type: BOOTSTRAP.SUCCESS
  })
}
