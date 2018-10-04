import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { actions, selectors, types } from 'state/interface'
import * as ProjectDetail from 'views/pages/project-detail'

const watchGetProject = function*() {
  while (true) {
    yield take(types[ 'PROJECT/GET_FAILED' ])

    yield put(
      actions.requestLocation('/projects')
    )
  }
}

const watchCreatePreset = function*(path) {
  while (true) {
    yield take(`${ types[ 'DIALOG/SHOW' ] }:CREATE_PRESET`)

    yield put(
      actions.mergeUIState(path, {
        isCreatePresetDialogActive: true
      })
    )

    const { createCompleted } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:CREATE_PRESET`),
      createCompleted: take(types[ 'PRESET/CREATE_COMPLETED' ]),
      createFailed: take(types[ 'PRESET/CREATE_FAILED' ])
    })

    yield all([
      put(
        actions.mergeUIState(path, {
          isCreatePresetDialogActive: false
        })
      ),
      createCompleted ?
        put(
          actions.requestLocation(`/projects/${ createCompleted.payload.identifier }/presets/${ createCompleted.payload.preset.contentType.replace('/', '_') }`)
        ) : null
    ])
  }
}

const whatchLeaveProject = function*(path) {
  while (true) {
    const action = yield take(`${ types[ 'DIALOG/SHOW' ] }:LEAVE_PROJECT`)
    const { idToRemove } = action.payload.params

    yield put(
      actions.mergeUIState(path, {
        isLeaveProjectDialogActive: true,
        idToRemove
      })
    )

    const { removeCompleted } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:LEAVE_PROJECT`),
      removeCompleted: take(types[ 'PROJECT/DELETE_COLLABORATOR_COMPLETED' ])
    })

    yield all([
      put(
        actions.mergeUIState(path, {
          isLeaveProjectDialogActive: false
        })
      ),
      removeCompleted ?
        put(
          actions.requestLocation('/projects')
        ) : null
    ])
  }
}

export default {
  '/projects/:identifier': {
    component: ProjectDetail,
    exact: true,
    *state(path) {
      yield fork(watchGetProject, path)
      yield fork(watchCreatePreset, path)
      yield fork(whatchLeaveProject, path)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.fetchPresets({ identifier })
        ),
        put(
          actions.getPullSetting(identifier)
        ),
        put(
          actions.fetchSecretKeys(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            notFound: false,
            isCreatePresetDialogActive: false,
            isLeaveProjectDialogActive: false
          })
        )
      ])
    }
  }
}
