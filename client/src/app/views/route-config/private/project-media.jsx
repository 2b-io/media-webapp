import { put, select } from 'redux-saga/effects'

import { actions, selectors } from 'state/interface'
import * as ProjectMedia from 'views/pages/project-media'

export default {
  '/projects/:identifier/media': {
    component: ProjectMedia,
    exact: true,
    *state() {
      const { identifier } = yield select(selectors.currentParams)

      yield put(
        actions.fetchProjectMedia(identifier)
      )
    }
  }
}
