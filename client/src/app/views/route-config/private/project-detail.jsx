import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as ProjectDetail from 'views/pages/project-detail'

const watchGetProject = function*() {
  while (true) {
    yield take(types.project.GET_FAILED)

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
}

const watchCreatePreset = function*(path) {
  while (true) {
    yield take(`${ types[ 'DIALOG/SHOW' ] }:CREATE_PRESET`)

    yield put(
      actions.mergeUIState(path, {
        isCreatePresetDialogActive: true
      })
    )

    const { createCompleted } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:CREATE_PRESET`),
      createCompleted: take(types.preset.CREATE_COMPLETED),
      createFailed: take(types.preset.CREATE_FAILED)
    })

    yield all([
      put(
        actions.mergeUIState(path, {
          isCreatePresetDialogActive: false
        })
      ),
      createCompleted ?
        put(
          actions.requestLocation(`/projects/${ createCompleted.payload.identifier }/presets/${ createCompleted.payload.preset.contentType.replace('/', '_') }`)
        ) : null
    ])
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

    const { removeCompleted } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:LEAVE_PROJECT`),
      removeCompleted: take(types.project.DELETE_COLLABORATOR_COMPLETED)
    })

    yield all([
      put(
        actions.mergeUIState(path, {
          isLeaveProjectDialogActive: false
        })
      ),
      removeCompleted ?
        put(
          actions.requestLocation('/projects')
        ) : null
    ])
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

    const { makeOwnerCompleted } = yield race({
      hide: take(`${ types[ 'DIALOG/HIDE' ] }:MAKE_OWNER`),
      makeOwnerCompleted: take(types.project.MAKE_OWNER_COMPLETED)
    })

    yield all([
      put(
        actions.mergeUIState(path, {
          isMakeOwnerDialogActive: false
        })
      ),
      makeOwnerCompleted ?
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        ) : null
    ])
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
      yield fork(watchGetProject, path)
      yield fork(watchCreateSecretKey)
      yield fork(watchRemoveSecretKey)
      yield fork(watchUpdateSecretKey)
      yield fork(watchCreatePreset, path)
      yield fork(watchLeaveProject, path)
      yield fork(watchMakeOwner, path)

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
