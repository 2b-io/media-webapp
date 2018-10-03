import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { actions, selectors, types } from 'state/interface'
import * as Preset from 'views/pages/preset'

const watchGetPreset = function*(path) {
  while (true) {
    yield take(types[ 'PRESET/GET_FAILED' ])

    const { identifier } = yield select(selectors.currentParams)

    yield put(
      actions.requestLocation(`/projects/${ identifier }`)
    )
  }
}

const watchGetProject = function*(path) {
  while (true) {
    yield take(types[ 'PROJECT/GET_FAILED' ])

    yield put(
      actions.requestLocation('/projects')
    )
  }
}

const watchRemovePreset = function*(path) {
  while (true) {
    const showAction = yield take(`${ types[ 'DIALOG/SHOW' ]}:REMOVE_PRESET`)

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
    const showAction = yield take(`${ types[ 'DIALOG/SHOW' ] }:UPDATE_PRESET`)

    yield put(
      actions.mergeUIState(path, {
        isUpdatePresetDialogActive: showAction.payload.params
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
    state: function*(path) {
      yield fork(watchGetPreset, path)
      yield fork(watchGetProject, path)
      yield fork(watchRemovePreset, path)
      yield fork(watchUpdatePreset, path)

      const { contentType, identifier } = yield select(selectors.currentParams)

      console.log(contentType, identifier)

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
