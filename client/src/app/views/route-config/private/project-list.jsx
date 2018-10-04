import { all, fork, put, take } from 'redux-saga/effects'

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

const watchFilterMenu = function*(path) {
  while (true) {
    yield take(types[ 'MENU/SHOW' ])

    yield put(
      actions.mergeUIState(path, {
        isFilterMenuActive: true
      })
    )

    yield take(types[ 'MENU/HIDE' ])

    yield put(
      actions.mergeUIState(path, {
        isFilterMenuActive: false
      })
    )
  }
}

export default {
  '/projects': {
    component: ProjectList,
    exact: true,
    *state(path) {
      yield fork(watchFilterMenu, path)
      yield fork(watchHideDisabledProjects, path)
      yield fork(watchSortCondition, path)

      yield all([
        put(
          actions.fetchProjects()
        ),
        put(
          actions.initializeUIState(path, {
            isFilterMenuActive: false,
            hideDisabledProjects: false,
            sortAscending: true,
            sortType: 'name'
          })
        )
      ])
    }
  }
}
