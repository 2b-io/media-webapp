import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as ProjectDetail from 'views/pages/project-detail'

const watchGetProject = function*(path) {
  const { completed, failed } = yield race({
    completed: take(types.project.GET_COMPLETED),
    failed: take(types.project.GET_FAILED)
  })

  if (failed) {
    yield all([
      fork(addToast, {
        type: 'error',
        message: 'Cannot connect to project. Project does not exist or network has error(s).'
      }),
      put(
        actions.requestLocation('/projects')
      )
    ])
  }

  if (completed) {
    const { isActive, status } = completed.payload.project

    if (isActive === true && status === 'DEPLOYED') {
      yield put(
        actions.mergeUIState(path, {
          isProjectActive: true
        })
      )
    }
  }
}

const watchGetCacheSetting = function*() {
  yield take(types.cacheSetting.GET_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Get cache setting failed.'
  })
}

const watchFetchPreset = function*() {
  yield take(types.preset.FETCH_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Fetch presets failed.'
  })
}

const watchFetchSecretKey = function*() {
  yield take(types.secretKey.FETCH_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Fetch secret key failed.'
  })
}

const watchGetPullSetting = function*() {
  yield take(types.pullSetting.GET_FAILED)

  yield fork(addToast, {
    type: 'error',
    message: 'Get pull setting failed.'
  })
}

const watchCreatePreset = function*(path) {
  while (true) {
    yield take(`${ types.dialog.SHOW }:CREATE_PRESET`)

    yield put(
      actions.mergeUIState(path, {
        isCreatePresetDialogActive: true
      })
    )

    const { hide } = yield race({
      hide: take(`${ types.dialog.HIDE }:CREATE_PRESET`),
      create: take(types.preset.CREATE)
    })

    yield put(
      actions.mergeUIState(path, {
        isCreatePresetDialogActive: false
      })
    )

    if (hide) {
      continue
    }

    const { createCompleted, createFailed } = yield race({
      createCompleted: take(types.preset.CREATE_COMPLETED),
      createFailed: take(types.preset.CREATE_FAILED)
    })

    yield put(
      actions.mergeUIState(path, {
        idle: true
      })
    )

    if (createCompleted) {
      yield put(
        actions.requestLocation(`/projects/${ createCompleted.payload.identifier }/presets/${ createCompleted.payload.preset.contentType.replace('/', '_') }`)
      )
    }

    if (createFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Cannot add new preset. Please check your network connection and try again.'
      })
    }
  }
}

const watchRemoveCollaborator = function*() {
  while (true) {
    const action = yield take(types.project.DELETE_COLLABORATOR)

    const { removeCompleted, removeFailed } = yield race({
      removeCompleted: take(types.project.DELETE_COLLABORATOR_COMPLETED),
      removeFailed: take(types.project.DELETE_COLLABORATOR_FAILED)
    })

    const session = yield select(selectors.currentSession)
    const isLeaveProject = action.payload.accountId === session.account.identifier

    if (removeCompleted) {
      yield fork(addToast, {
        expiring: '5s',
        type: 'success',
        message: isLeaveProject ?
          'Successfully left the project.' :
          'The collaborator has been removed.'
      })
    }

    if (removeFailed) {
      yield fork(addToast, {
        type: 'error',
        message: isLeaveProject ?
          'Failed to leave the project.' :
          'Cannot remove the collaborator. Please check your internet connection and try again.'
      })
    }
  }
}

const watchLeaveProject = function*(path) {
  while (true) {
    const action = yield take(`${ types.dialog.SHOW }:LEAVE_PROJECT`)

    yield put(
      actions.mergeUIState(path, {
        isLeaveProjectDialogActive: action.payload.params,
      })
    )

    yield race({
      hide: take(`${ types.dialog.HIDE }:LEAVE_PROJECT`),
      removeCompleted: take(types.project.DELETE_COLLABORATOR_COMPLETED),
      removeFailed: take(types.project.DELETE_COLLABORATOR_FAILED)
    })

    yield put(
      actions.mergeUIState(path, {
        isLeaveProjectDialogActive: false
      })
    )
  }
}

const watchMakeOwner = function*(path) {
  while (true) {
    const action = yield take(`${ types.dialog.SHOW }:MAKE_OWNER`)
    const { identifier } = action.payload.params

    yield put(
      actions.mergeUIState(path, {
        isMakeOwnerDialogActive: action.payload.params,
      })
    )

    const { makeOwnerCompleted, makeOwnerFailed } = yield race({
      hide: take(`${ types.dialog.HIDE }:MAKE_OWNER`),
      makeOwnerCompleted: take(types.project.MAKE_OWNER_COMPLETED),
      makeOwnerFailed: take(types.project.MAKE_OWNER_FAILED)
    })

    yield put(
      actions.mergeUIState(path, {
        isMakeOwnerDialogActive: false
      })
    )

    if (makeOwnerCompleted) {
      yield all([
        yield fork(addToast, {
          expiring: '5s',
          type: 'success',
          message: 'The collaborator has been set to owner.'
        }),
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        )
      ])
    }

    if (makeOwnerFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Cannot set this collaborator as owner. Please check your internet connection and try again.'
      })
    }
  }
}

const watchCreateSecretKey = function*() {
  while (true) {
    const { createCompleted, createFailed } = yield race({
      createCompleted: take(types.secretKey.CREATE_COMPLETED),
      createFailed: take(types.secretKey.CREATE_FAILED)
    })

    if (createCompleted) {
      yield fork(addToast, {
        expiring: '5s',
        type: 'success',
        message: 'A new API key created.'
      })
    }

    if (createFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Cannot create API key. Please check your internet connection and try again.'
      })
    }
  }
}

const watchUpdateSecretKey = function*() {
  while (true) {
    const {
      payload: {
        secretKey: { isActive }
      }
    } = yield take(types.secretKey.UPDATE)

    const { updateCompleted, updateFailed } = yield race({
      updateCompleted: take(types.secretKey.UPDATE_COMPLETED),
      updateFailed: take(types.secretKey.UPDATE_FAILED)
    })

    if (updateCompleted) {
      yield fork(addToast, {
        expiring: '5s',
        type: 'success',
        message: `Sucessfully ${ isActive ? 'enable' : 'disable' } the API key.`
      })
    }

    if (updateFailed) {
      yield fork(addToast, {
        type: 'error',
        message: `Can not ${ isActive ? 'enable' : 'disable' } the API key. Please check your internet connection and try again.`
      })
    }
  }
}

const watchRemoveSecretKey = function*() {
  while (true) {
    const { removeCompleted, removeFailed } = yield race({
      removeCompleted: take(types.secretKey.REMOVE_COMPLETED),
      removeFailed: take(types.secretKey.REMOVE_FAILED)
    })

    if (removeCompleted) {
      yield fork(addToast, {
        expiring: '5s',
        type: 'success',
        message: 'Sucessfully remove the API key.'
      })
    }

    if (removeFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Can not remove the API key. Please check your internet connection and try again.'
      })
    }
  }
}

export default {
  '/projects/:identifier': {
    component: ProjectDetail,
    exact: true,
    *state(path) {
      yield fork(watchGetProject, path)
      yield fork(watchFetchPreset)
      // yield fork(watchFetchSecretKey)
      yield fork(watchGetPullSetting)
      yield fork(watchGetCacheSetting)
      //yield fork(watchCreateSecretKey)
      yield fork(watchRemoveSecretKey)
      yield fork(watchUpdateSecretKey)
      yield fork(watchCreatePreset, path)
      yield fork(watchLeaveProject, path)
      yield fork(watchMakeOwner, path)
      yield fork(watchRemoveCollaborator)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.fetchPresets({ identifier })
        ),
        put(
          actions.getCacheSetting(identifier)
        ),
        put(
          actions.getPullSetting(identifier)
        ),
        put(
          actions.fetchSecretKeys(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            idle: true,
            isProjectActive: false,
            isCreatePresetDialogActive: false,
            isLeaveProjectDialogActive: false,
            isMakeOwnerDialogActive: false
          })
        )
      ])
    }
  }
}
