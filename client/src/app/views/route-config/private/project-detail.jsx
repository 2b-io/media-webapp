import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as ProjectDetail from 'views/pages/project-detail'

const watchGetProjectDetail = function*() {
  while (true) {
    const {
      fetchPresetsFailed,
      fetchSecretKeyFailed,
      getProjectFailed,
      getPullSettingFailed
    } = yield race({
      fetchPresetsFailed: take(types.preset.FETCH_FAILED),
      getProjectFailed: take(types.project.GET_FAILED),
      getPullSettingFailed: take(types.pullSetting.GET_FAILED),
      fetchSecretKeyFailed: take(types.secretKey.FETCH_FAILED)
    })

    if (getProjectFailed) {
      yield all([
        fork(addToast, {
          type: 'error',
          message: 'Project does not exist or internet connection error.'
        }),
        put(
          actions.requestLocation('/projects')
        )
      ])
    }

    if (fetchPresetsFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Fetch presets failed.'
      })
    }

    if (getPullSettingFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Get pull setting failed.'
      })
    }

    if (fetchSecretKeyFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Fetch secret key failed.'
      })
    }
  }
}

const watchCreatePreset = function*(path) {
  while (true) {
    yield take(`${ types[ 'DIALOG/SHOW' ] }:CREATE_PRESET`)

    yield put(
      actions.mergeUIState(path, {
        isCreatePresetDialogActive: true
      })
    )

    const { createCompleted, createFailed } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:CREATE_PRESET`),
      createCompleted: take(types.preset.CREATE_COMPLETED),
      createFailed: take(types.preset.CREATE_FAILED)
    })

    yield put(
      actions.mergeUIState(path, {
        isCreatePresetDialogActive: false
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
        message: 'Can not add new preset. Please check your network connection and try again.'
      })
    }
  }
}

const watchRemoveCollaborator = function*() {
  while (true) {
    const { removeCompleted, removeFailed } = yield race({
      removeCompleted: take(types.project.DELETE_COLLABORATOR_COMPLETED),
      removeFailed: take(types.project.DELETE_COLLABORATOR_FAILED)
    })

    if (removeCompleted) {
      yield fork(addToast, {
        type: 'success',
        message: 'The collaborator have been removed.'
      })
    }

    if (removeFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Can not Remove the collaborator. Please check your internet connection and try again.'
      })
    }
  }
}

const watchLeaveProject = function*(path) {
  while (true) {
    const action = yield take(`${ types[ 'DIALOG/SHOW' ] }:LEAVE_PROJECT`)

    yield put(
      actions.mergeUIState(path, {
        isLeaveProjectDialogActive: action.payload.params,
      })
    )

    yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:LEAVE_PROJECT`),
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
    const action = yield take(`${ types[ 'DIALOG/SHOW' ] }:MAKE_OWNER`)
    const { identifier } = action.payload.params

    yield put(
      actions.mergeUIState(path, {
        isMakeOwnerDialogActive: action.payload.params,
      })
    )

    const { makeOwnerCompleted, makeOwnerFailed } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:MAKE_OWNER`),
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
          type: 'success',
          message: 'The collaborator have been set to owner.'
        }),
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        )
      ])
    }

    if (makeOwnerFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Can not set this collaborator to owner. Please check your internet connection and try again.'
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
        type: 'success',
        message: 'Created a new API key.'
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
        type: 'success',
        message: `${ isActive ? 'Enable' : 'Disable' } the API key completed.`
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
        type: 'success',
        message: 'Remove the API key completed.'
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
      yield fork(watchGetProjectDetail)
      yield fork(watchCreateSecretKey)
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
          actions.getPullSetting(identifier)
        ),
        put(
          actions.fetchSecretKeys(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            idle: true,
            notFound: false,
            isCreatePresetDialogActive: false,
            isLeaveProjectDialogActive: false,
            isMakeOwnerDialogActive: false
          })
        )
      ])
    }
  }
}
