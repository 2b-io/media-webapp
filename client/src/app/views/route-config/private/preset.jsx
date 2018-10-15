import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as Preset from 'views/pages/preset'

const watchGetProject = function*() {
  while (true) {
    yield take(types[ 'PROJECT/GET_FAILED' ])

    yield all([
      put(
        actions.requestLocation('/projects')
      ),
      fork(addToast, {
        type: 'error',
        message: 'Project does not exist or internet connection error.'
      })
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

    const { removeCompleted } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:REMOVE_PRESET`),
      removeCompleted: take(types[ 'PRESET/REMOVE_COMPLETED' ])
    })

    const { identifier } = yield select(selectors.currentParams)

    yield all([
      put(
        actions.mergeUIState(path, {
          isRemovePresetDialogActive: false
        })
      ),
      removeCompleted ?
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        ) : null
    ])
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

    yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:UPDATE_PRESET`),
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
