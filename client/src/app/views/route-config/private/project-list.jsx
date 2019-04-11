import { all, fork, put, take, race } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import * as ProjectList from 'views/pages/project-list'
import { addToast } from 'state/saga/toast'

const watchFetchProjects = function*(path) {
  const { completed, failed } = yield race({
    completed: take(types.project.FETCH_COMPLETED),
    failed: take(types.project.GET_FAILED)
  })

  if (failed) {
    yield fork(addToast, {
      type: 'error',
      message: 'Cannot fetch project. Project does not exist or network has error(s).'
    })
  }

  yield put(
    actions.mergeUIState(path, {
      idle: true
    })
  )
}

const watchHideDisabledProjects = function*(path) {
  while (true) {
    const action = yield take(types.project.HIDE_DISABLE)

    yield put(
      actions.mergeUIState(path, {
        hideDisabledProjects: action.payload.hide
      })
    )
  }
}

const watchSortCondition = function*(path) {
  while (true) {
    const action = yield take(types.project.SORT)

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
    yield take(types.menu.SHOW)

    yield put(
      actions.mergeUIState(path, {
        isFilterMenuActive: true
      })
    )

    yield take(types.menu.HIDE)

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
      yield fork(watchFetchProjects, path)
      yield fork(watchFilterMenu, path)
      yield fork(watchHideDisabledProjects, path)
      yield fork(watchSortCondition, path)

      yield all([
        put(
          actions.fetchProjects()
        ),
        put(
          actions.initializeUIState(path, {
            idle: false,
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
