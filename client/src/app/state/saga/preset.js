import { all, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Preset from 'models/preset'
import { actions, types, selectors } from 'state/interface'

import { addToast } from './toast'

const createLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier,
          contentType
        }
      } = yield take(types.preset.CREATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const newPreset = yield Preset.create(session.token, identifier, contentType)

      yield all([
        put(
          actions.createPresetCompleted({
            preset: newPreset,
            identifier
          })
        ),
        fork(addToast, {
          type: 'success',
          message: 'Preset created.'
        })
      ])
    } catch (e) {
      yield put(
        actions.createPresetFailed(serializeError(e))
      )
    }
  }
}

const deleteLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier,
          contentType
        }
      } = yield take(types.preset.REMOVE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const removed = yield Preset.remove(session.token, identifier, contentType)

      if (!removed) {
        throw 'Remove preset failed'
      }

      yield all([
        put(
          actions.removePresetCompleted({
            contentType,
            identifier
          })
        ),
        fork(addToast, {
          type: 'success',
          message: 'Preset deleted.'
        })
      ])
    } catch (e) {
      yield put(
        actions.removePresetFailed(serializeError(e))
      )
    }
  }
}

const getLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          contentType,
          identifier
        }
      } = yield take(types.preset.GET)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const preset = yield Preset.get(session.token, identifier, contentType)

      yield put(
        actions.getPresetCompleted({
          identifier,
          preset
        })
      )
    } catch (e) {
      yield put(
        actions.getPresetFailed(serializeError(e))
      )
    }
  }
}

const fetchLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier
        }
      } = yield take(types.preset.FETCH)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const presets = yield Preset.fetch(session.token, identifier)

      yield put(
        actions.fetchPresetsCompleted({
          presets,
          identifier
        })
      )
    } catch (e) {
      yield put(
        actions.fetchPresetsFailed(serializeError(e))
      )
    }
  }
}

const updateLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier,
          preset
        }
      } = yield take(types.preset.UPDATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const updatedPreset = yield Preset.update(session.token, identifier, preset)

      yield all([
        put(
          actions.updatePresetCompleted({
            preset: updatedPreset,
            identifier
          })
        ),
        fork(addToast, {
          type: 'success',
          message: 'Preset updated.'
        })
      ])
    } catch (e) {
      yield put(
        actions.updatePresetFailed(serializeError(e))
      )
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
