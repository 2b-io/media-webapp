import { fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import * as Preset from 'views/pages/preset'

const watchGetPreset  = function*(path) {
  while (true) {
    const getAction = yield take(types[ 'PRESET/GET_FAILED' ])

    if (getAction.type !== 'preset/GET_FAILED') {
      continue
    }

    yield put(
      actions.mergeUIState(path, {
        notFoundPreset: true
      })
    )

  }
}

const watchRemovePreset = function*(path) {
  while (true) {
    const showAction = yield take(types[ 'DIALOG/SHOW' ])

    if (showAction.payload.name !== 'REMOVE_PRESET') {
      continue
    }

    yield put(
      actions.mergeUIState(path, {
        isRemovePresetDialogActive: true
      })
    )

    yield race({
      hide: take(types[ 'DIALOG/HIDE' ]),
      removeCompleted: take(types[ 'PRESET/REMOVE_COMPLETED' ])
    })

    yield put(
      actions.mergeUIState(path, {
        isRemovePresetDialogActive: false,
        removePresetResult: true
      })
    )
  }
}

const watchUpdatePreset = function*(path) {
  while (true) {
    const showAction = yield take(types[ 'DIALOG/SHOW' ])

    if (showAction.payload.name !== 'UPDATE_PRESET') {
      continue
    }

    yield put(
      actions.mergeUIState(path, {
        isUpdatePresetDialogActive: showAction.payload.params
      })
    )

    yield race({
      hide: take(types[ 'DIALOG/HIDE' ]),
      updateCompleted: take(types[ 'PRESET/UPDATE_COMPLETED' ])
    })

    yield put(
      actions.mergeUIState(path, {
        isUpdatePresetDialogActive: false
      })
    )
  }
}

export default {
  '/projects/:identifier/presets/:contentType': {
    component: Preset,
    exact: true,
    onEnter: ({ contentType, identifier }) => [
      actions.getProject(identifier),
      actions.getPreset({
        identifier,
        contentType: contentType.replace('_', '/')
      })
    ],
    state: function*(path) {
      yield put(
        actions.initializeUIState(path, {
          isRemovePresetDialogActive: false,
          isUpdatePresetDialogActive: false,
          removePresetResult: null
        })
      )

      yield fork(watchGetPreset, path)
      yield fork(watchRemovePreset, path)
      yield fork(watchUpdatePreset, path)
    }
  }
}
