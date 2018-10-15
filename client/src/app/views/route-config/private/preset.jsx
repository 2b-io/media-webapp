import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as Preset from 'views/pages/preset'

const watchGetProject = function*() {
  while (true) {
    yield take(types.project.GET_FAILED)

    yield all([
      fork(addToast, {
        type: 'error',
        message: 'Project does not exist or internet connection error.'
      }),
      put(
        actions.requestLocation('/projects')
      )
    ])
  }
}

const watchGetPreset = function*() {
  while (true) {
    yield take(types.preset.GET_FAILED)

    const { identifier } = yield select(selectors.currentParams)

    yield all ([
      yield fork(addToast, {
        type: 'error',
        message: 'Get preset failed.'
      }),
      put(
        actions.requestLocation(`/projects/${ identifier }`)
      )
    ])
  }
}

const watchRemovePreset = function*(path) {
  while (true) {
    yield take(`${ types[ 'DIALOG/SHOW' ]}:REMOVE_PRESET`)

    yield put(
      actions.mergeUIState(path, {
        isRemovePresetDialogActive: true
      })
    )

    const { removeCompleted, removeFailed } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:REMOVE_PRESET`),
      removeCompleted: take(types.preset.REMOVE_COMPLETED),
      removeFailed: take(types.preset.REMOVE_FAILED)
    })

    const { identifier } = yield select(selectors.currentParams)

    yield put(
      actions.mergeUIState(path, {
        isRemovePresetDialogActive: false
      })
    )

    if (removeCompleted) {
      yield all ([
        fork(addToast, {
          type: 'success',
          message: 'Preset have been removed.'
        }),
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        )
      ])
    }

    if (removeFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Remove preset failed.'
      })
    }
  }
}

const watchUpdatePreset = function*(path) {
  while (true) {
    const action = yield take(`${ types[ 'DIALOG/SHOW' ] }:UPDATE_PRESET`)

    yield put(
      actions.mergeUIState(path, {
        isUpdatePresetDialogActive: action.payload.params
      })
    )

    const { updateCompleted, updateFailed } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:UPDATE_PRESET`),
      updateCompleted: take(types.preset.UPDATE_COMPLETED),
      updateFailed: take(types.preset.UPDATE_FAILED)
    })

    yield put(
      actions.mergeUIState(path, {
        isUpdatePresetDialogActive: false
      })
    )

    if (updateCompleted) {
      yield fork(addToast, {
        type: 'success',
        message: 'Preset have been updated.'
      })
    }

    if (updateFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Can not update the preset. Please check your network connection and try again.'
      })
    }
  }
}

export default {
  '/projects/:identifier/presets/:contentType': {
    component: Preset,
    exact: true,
    *state(path) {
      yield fork(watchGetPreset, path)
      yield fork(watchGetProject)
      yield fork(watchRemovePreset, path)
      yield fork(watchUpdatePreset, path)

      const { contentType, identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.getPreset({
            identifier,
            contentType: contentType.replace('_', '/')
          })
        ),
        put(
          actions.initializeUIState(path, {
            isRemovePresetDialogActive: false,
            isUpdatePresetDialogActive: false
          })
        )
      ])
    }
  }
}
