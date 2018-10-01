import { fork, put, take } from 'redux-saga/effects'

import { actions } from 'state/interface'
import * as ProjectDetail from 'views/pages/project-detail'

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
          notFound: false
        })
      )
    }
  }
}
