import { fork, put, take } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import * as ProjectList from 'views/pages/project-list'

const watchHideDisabledProjects = function*(path) {
  while (true) {
    const action = yield take(types[ 'PROJECT/HIDE_DISABLE' ])

    yield put(
      actions.mergeUIState(path, {
        hideDisabledProjects: action.payload.hide
      })
    )
  }
}

const watchSortCondition = function*(path) {
  while (true) {
    const action = yield take(types[ 'PROJECT/SORT' ])

    yield put(
      actions.mergeUIState(path, {
        sortType: action.payload.sortCondition.type,
        sortAscending: action.payload.sortCondition.ascending
      })
    )
  }
}

export default {
  '/projects': {
    component: ProjectList,
    exact: true,
    onEnter: () => [
      actions.fetchProjects()
    ],
    state: function*(path) {
      yield put(
        actions.initializeUIState(path, {
          sortType: 'name',
          sortAscending: true,
          hideDisabledProjects: false
        })
      )

      yield fork(watchHideDisabledProjects, path)
      yield fork(watchSortCondition, path)
    }
  }
}
