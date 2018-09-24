import { all, call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Preset from 'models/preset'
import { actions, types, selectors } from 'state/interface'

import { addToast } from './toast'

const createLoop = function*() {
  while (true) {
    const action = yield take(types['PRESET/CREATE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier, contentType } = action.payload
      const newPreset = yield call(
        Preset.create,
        session.token,
        identifier,
        contentType
      )

      yield all([
        put(actions.createPresetCompleted({
          preset: newPreset,
          identifier
        })),
        fork(addToast, {
          type: 'success',
          message: 'Preset created.'
        })
      ])
    } catch (e) {
      yield put(actions.createPresetFailed(serializeError(e)))
      continue
    }
  }
}

const deleteLoop = function*() {
  while (true) {
    const action = yield take(types['PRESET/REMOVE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { preset, identifier } = action.payload

      const destroyed = yield call(
        Preset.remove,
        session.token,
        preset,
        identifier
      )
      if (!destroyed) {
        throw new Error('Cannot delete preset')
      }

      yield all([
        put(actions.removePresetCompleted({ preset, identifier })),
        put(actions.hideDialog({ dialog: 'ConfirmDeletePresetDialog' })),
        fork(addToast, {
          type: 'success',
          message: 'Preset deleted.'
        })
      ])
    } catch (e) {
      yield put(actions.removePresetFailed(serializeError(e)))
      continue
    }
  }
}

const getLoop = function*() {
  while (true) {
    const action = yield take(types['PRESET/GET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { contentType, identifier } = action.payload

      const preset = yield call(
        Preset.get,
        session.token,
        identifier,
        contentType
      )

      yield put(actions.getPresetCompleted({ preset, identifier }))
    } catch (e) {
      yield put(actions.getPresetFailed(serializeError(e)))
      continue
    }
  }
}
const fetchLoop = function*() {
  while (true) {
    const action = yield take(types['PRESET/FETCH'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier } = action.payload
      const presets = yield Preset.fetch(session.token, identifier)
      yield put(actions.fetchPresetsCompleted({ presets, identifier }))
    } catch (e) {
      yield put(actions.fetchPresetsFailed(serializeError(e)))
      continue
    }
  }
}

const updateLoop = function*() {
  while (true) {
    const action = yield take(types['PRESET/UPDATE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier, preset } = action.payload

      const newPreset = yield call(
        Preset.update,
        session.token,
        identifier,
        preset
      )

      yield all([
        put(actions.updatePresetCompleted({
          preset: newPreset,
          identifier
        })),
        fork(addToast, {
          type: 'success',
          message: 'Preset updated.'
        })
      ])
    } catch (e) {
      yield put(actions.updatePresetFailed(serializeError(e)))
      continue
    }
  }
}


export default function*() {
  yield take('@@INITIALIZED')
  yield fork(createLoop)
  yield fork(deleteLoop)
  yield fork(getLoop)
  yield fork(fetchLoop)
  yield fork(updateLoop)
}
