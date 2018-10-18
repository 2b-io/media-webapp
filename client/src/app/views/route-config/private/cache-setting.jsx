import { all, put, select } from 'redux-saga/effects'

//import { addToast } from 'state/saga/toast'
import { actions, selectors } from 'state/interface'
import * as CacheSetting from 'views/pages/cache-setting'

export default {
  '/projects/:identifier/cache-setting': {
    component: CacheSetting,
    exact: true,
    *state(path) {
      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),

        put(
          actions.initializeUIState(path, {
            idle: true
          })
        )
      ])
    }
  }
}
