import { put, select } from 'redux-saga/effects'

import { actions, selectors } from 'state/interface'
import * as CacheInvalidate from 'views/pages/cache-invalidate'

export default {
  '/projects/:identifier/cache-invalidator': {
    component: CacheInvalidate,
    exact: true,
    *state() {
      const { identifier } = yield select(selectors.currentParams)

      yield put(
        actions.getProject(identifier)
      )
    }
  }
}
