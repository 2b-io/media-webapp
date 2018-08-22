import { all, call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

import { addToast } from './toast'

const createLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/CREATE_PRESET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { preset, slug } = action.payload

      const newPreset = yield call(
        Project.createPreset,
        { preset, slug },
        session.token
      )

      yield all([
        put(actions.createPresetCompleted({
          preset: newPreset,
          slug
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
    const action = yield take(types['PROJECT/DELETE_PRESET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { preset, slug } = action.payload

      const destroyed = yield call(
        Project.deletePreset,
        { preset, slug },
        session.token
      )

      if (!destroyed) {
        throw new Error('Cannot delete preset')
      }

      yield all([
        put(actions.deletePresetCompleted({ preset, slug })),
        put(actions.hideDialog({ dialog: 'ConfirmDeletePresetDialog' })),
        fork(addToast, {
          type: 'success',
          message: 'Preset deleted.'
        })
      ])
    } catch (e) {
      yield put(actions.deletePresetFailed(serializeError(e)))
      continue
    }
  }
}

const getLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/GET_PRESET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { hash, slug } = action.payload

      const preset = yield call(Project.getPreset,
        { hash, slug },
        session.token
      )

      yield put(actions.getPresetCompleted({ preset, slug }))
    } catch (e) {
      yield put(actions.getPresetFailed(serializeError(e)))
      continue
    }
  }
}

const updateLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/UPDATE_PRESET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { preset, slug } = action.payload

      const newPreset = yield call(
        Project.updatePreset,
        { preset, slug },
        session.token
      )

      yield all([
        put(actions.updatePresetCompleted({
          preset: newPreset,
          slug
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
  yield fork(updateLoop)
}
