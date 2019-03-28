import { fork, put, take, all, race } from 'redux-saga/effects'

import { actions, types } from 'state/interface'
import * as Dashboard from 'views/pages/dashboard'
import { addToast } from 'state/saga/toast'

const watchInitialData = function*(path) {
  const { failedListPinnedProjects, failedListProjects, pinnedProjects } = yield race({
    failedListPinnedProjects: take(types.pinnedProjects.LIST_FAILED),
    failedListProjects: take(types.project.FETCH_FAILED),
    projects: take(types.project.FETCH_COMPLETED)
  })

  if (failedListProjects) {
    yield fork(addToast, {
      type: 'error',
      message: 'Project does not exists or network connection has error(s).'
    })
  }

  yield put(
    actions.mergeUIState(path, {
      idle: true
    })
  )
}

const watchUpdatePinProject = function*(path) {
  while (true) {
    yield take(`${ types.dialog.SHOW }:PIN_PROJECT`)

    yield put(
      actions.mergeUIState(path, {
        isPinProjectsDialogActive: true
      })
    )

    const { hide } = yield race({
      hide: take(`${ types.dialog.HIDE }:PIN_PROJECT`),
      update: take(types.pinnedProjects.UPDATE)
    })

    yield put(
      actions.mergeUIState(path, {
        isPinProjectsDialogActive: false
      })
    )

    if (hide) {
      continue
    }

    const { updateFailed } = yield race({
      updateCompleted: take(types.pinnedProjects.UPDATE_COMPLETED),
      updateFailed: take(types.pinnedProjects.UPDATE_FAILED)
    })

    yield put(
      actions.mergeUIState(path, {
        idle: true
      })
    )

    if (updateFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Cannot pin projects. Please check your network connection and try again.'
      })
    }
  }
}

const watchPinnedProjects = function*(path) {
  while (true) {
    const { list, update } = yield race({
      list: take(types.pinnedProjects.LIST_COMPLETED),
      update: take(types.pinnedProjects.UPDATE_COMPLETED)
    })

    const { pinnedProjects } = (list || update).payload

    yield put(
      actions.mergeUIState(path, {
        pinnedProjects
      })
    )
  }
}

export default {
  '/': {
    topLevel: true,
    component: Dashboard,
    exact: true,
    *state(path) {
      yield fork(watchInitialData, path)
      yield fork(watchUpdatePinProject, path)
      yield fork(watchPinnedProjects, path)

      yield all([
        put(
          actions.listPinnedProjects()
        ),
        put(
          actions.fetchProjects()
        ),
        put(
          actions.initializeUIState(path, {
            idle: false,
            isPinProjectsDialogActive: false
          })
        )
      ])
    }
  }
}
