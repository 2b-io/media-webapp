import { call, fork, put, select, take } from 'redux-saga/effects'

import { PRESET } from 'actions/preset'
import Preset from 'models/preset'

function* createPreset() {
  while (true) {
    const action = yield take(PRESET.CREATE_REQUEST)
    const session = yield select(state => state.domain.session)

    try {
      const preset  = yield call(Preset.create, {
        ...action.payload,
        token: session.token
      })

      yield put({
        type: PRESET.CREATE_SUCCESS,
        payload: {
          project: action.payload.project,
          preset
        }
      })
    } catch (error) {
      console.log(error)

      yield put({
        type: PRESET.CREATE_FAILURE,
        error
      })
    }
  }
}

function* removePreset() {
  while (true) {
    const action = yield take(PRESET.REMOVE_REQUEST)
    const session = yield select(state => state.domain.session)

    try {
      const result = yield call(Preset.remove, {
        ...action.payload,
        token: session.token
      })

      if (!result) throw new Error('remove preset failure')

      yield put({
        type: PRESET.REMOVE_SUCCESS,
        payload: {
          ...action.payload
        }
      })
    } catch (error) {
      console.log(error)

      yield put({
        type: PRESET.REMOVE_FAILURE,
        error
      })
    }
  }
}

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
  yield fork(createPreset)
  yield fork(removePreset)
  yield fork(updatePreset)
}
