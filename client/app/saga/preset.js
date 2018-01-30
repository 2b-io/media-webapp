import { call, fork, put, select, take } from 'redux-saga/effects'

import { PRESET } from 'actions/preset'
import Preset from 'models/preset'

function* updatePreset() {
  while (true) {
    const action = yield take(PRESET.UPDATE_REQUEST)
    const session = yield select(state => state.domain.session)

    try {
      const preset = yield call(Preset.update, {
        ...action.payload,
        token: session.token
      })

      yield put({
        type: PRESET.UPDATE_SUCCESS,
        payload: {
          project: action.payload.project,
          preset
        }
      })
    } catch (error) {
      yield put({
        type: PRESET.UPDATE_FAILURE,
        error
      })
    }
  }
}

export default function* root() {
  yield fork(updatePreset)
}
