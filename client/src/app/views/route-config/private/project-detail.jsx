import { all, fork, put, race, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import * as ProjectDetail from 'views/pages/project-detail'

const watchCreatePreset = function*(path) {
  while (true) {
    const action = yield take(types[ 'DIALOG/SHOW' ])

    yield put(
      actions.mergeUIState(path, {
        isCreatePresetDialogActive: true
      })
    )

    const {
      hide,
      createCompleted,
      createFailed
    } = yield race({
      hide: take(types[ 'DIALOG/HIDE' ]),
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

export default {
  '/projects/:identifier': {
    component: ProjectDetail,
    exact: true,
    onEnter: ({ identifier }) => identifier === 'create' || [
      actions.getProject(identifier),
      actions.fetchPresets({ identifier }),
      actions.getPullSetting(identifier),
      actions.fetchSecretKeys(identifier)
    ],
    state: function*(path) {
      yield put(
        actions.initializeUIState(path, {
          notFound: false,
          isCreatePresetDialogActive: false
        })
      )

      yield fork(watchCreatePreset, path)
    }
  }
}
