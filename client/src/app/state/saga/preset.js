import { all, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Preset from 'models/preset'
import { actions, types, selectors } from 'state/interface'

const createLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          contentType,
          identifier
        }
      } = yield take(types.preset.CREATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const newPreset = yield Preset.create({
        contentType,
        identifier
      }, {
        token: session.token
      })

      yield put(
        actions.createPresetCompleted({
          preset: newPreset,
          identifier
        })
      )
    } catch (e) {
      yield put(
        actions.createPresetFailed(serializeError(e))
      )
    }
  }
}

const removeLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          contentType,
          identifier
        }
      } = yield take(types.preset.REMOVE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const removed = yield Preset.remove({
        contentType,
        identifier
      }, {
        token: session.token
      })

      if (!removed) {
        throw 'Remove preset failed'
      }

      yield put(
        actions.removePresetCompleted({
          contentType,
          identifier
        })
      )
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

      const preset = yield Preset.get({
        contentType,
        identifier
      }, {
        token: session.token
      })

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

      const presets = yield Preset.fetch({
        identifier
      }, {
        token: session.token
      })

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

      const updatedPreset = yield Preset.update({
        identifier,
        preset
      }, {
        token: session.token
      })

      yield put(
        actions.updatePresetCompleted({
          preset: updatedPreset,
          identifier
        })
      )
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
  yield fork(removeLoop)
  yield fork(getLoop)
  yield fork(fetchLoop)
  yield fork(updateLoop)
}
