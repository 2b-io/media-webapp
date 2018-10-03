import { all, call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

import { addToast } from './toast'

const createLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/CREATE'])
    const { name, description, provider } = action.payload

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const newProject = yield call(Project.create, session.token, name, description, provider)

      yield all([
        put(actions.createProjectCompleted(newProject)),
        fork(addToast, {
          type: 'success',
          message: 'Project created.'
        })
      ])
    } catch (e) {
      yield put(actions.createProjectFailed(serializeError(e)))
      continue
    }
  }
}

const deleteLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/REMOVE'])
    const { identifier } = action.payload

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const deleted = yield Project.remove(identifier, session.token)

      if (!deleted) {
        throw new Error('Cannot delete project')
      }

      yield all([
        put(actions.removeProjectCompleted(identifier)),
        put(actions.hideDialog('REMOVE_PROJECT')),
        fork(addToast, {
          type: 'success',
          message: 'Project deleted.'
        })
      ])
    } catch (e) {
      yield put(actions.removeProjectFailed(serializeError(e)))
      continue
    }
  }
}

const getLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/GET'])
    const { identifier } = action.payload

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const project = yield call(Project.get, identifier, session.token)

      yield put(actions.getProjectCompleted(project))
    } catch (e) {
      yield put(actions.getProjectFailed(serializeError(e)))
      continue
    }
  }
}

const fetchLoop = function*() {
  while (true) {
    yield take(types['PROJECT/FETCH'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const projects = yield call(Project.fetch, session.token)

      yield put(actions.fetchProjectsCompleted(projects))
    } catch (e) {
      yield put(actions.fetchProjectsFailed(serializeError(e)))
      continue
    }
  }
}

const updateLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/UPDATE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const project = yield call(Project.update, action.payload.project, session.token)

      yield all([
        put(actions.updateProjectCompleted(project)),
        fork(addToast, {
          type: 'success',
          message: 'Project updated.'
        })
      ])
    } catch (e) {
      yield put(actions.updateProjectFailed(serializeError(e)))
      continue
    }
  }
}

const inviteCollaboratorLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/INVITE_COLLABORATOR'])
    const { identifier } = action.payload

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const collaborator = yield call(Project.inviteCollaborator, session.token, identifier, action.payload.emails, action.payload.messenge)
      collaborator.identifier = identifier
      if (collaborator) {
        yield all([
          put(actions.inviteCollaboratorCompleted(collaborators)),
          fork(addToast, {
            type: 'success',
            message: 'Collaborator invited.'
          })
        ])
      }

    } catch (e) {
      yield put(actions.inviteCollaboratorFailed(serializeError(e)))
      continue
    }
  }
}

const deleteCollaboratorLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/DELETE_COLLABORATOR'])
    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const deleted = yield Project.deleteCollaborator(session.token, action.payload.identifier, action.payload.accountId)

      if (!deleted) {
        throw new Error('Can not delete the collaborator.')
      }

      yield all([
        put(actions.deleteCollaboratorCompleted(action.payload.identifier, action.payload.accountId)),
        put(actions.hideDialog({ dialog: 'ConfirmDeleteCollaboratorDialog' })),
        fork(addToast, {
          type: 'success',
          message: 'Collaborator deleted.'
        })
      ])

    } catch (e) {
      yield all([
        put(actions.deleteCollaboratorFailed(serializeError(e))),
        fork(addToast, {
          type: 'error',
          message: 'Can not delete the collaborator.'
        })
      ])
      continue
    }
  }
}

const makeOwnerLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/MAKE_OWNER'])

    try {
      const session = yield select(selectors.currentSession)
      if (!session) {
        continue
      }

      const owner = yield call(Project.makeOwner, session.token, action.payload.identifier, action.payload.accountId)
      if (owner) {
        yield all([
          put(actions.makeOwnerCompleted(action.payload.identifier, session.account._id, action.payload.accountId)),
          fork(addToast, {
            type: 'success',
            message: 'Owner changed.'
          })
        ])
      }

    } catch (e) {
      yield put(actions.makeOwnerFailed(serializeError(e)))
      continue
    }
  }
}

const invalidateCacheLoop = function*() {
  while(true) {
    const action = yield take(types['PROJECT/INVALIDATE_CACHE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const invalidateCache = yield call(Project.invalidateCache, session.token, action.payload.identifier, action.payload.patterns)

      if (!invalidateCache) {
        throw new Error('An error happens when invalidate cache.')
      }

      yield all([
        put(actions.invalidateCacheCompleted(action.payload.identifier, action.payload.patterns)),
        fork(addToast, {
          type: 'success',
          message: 'Cache invalidated.'
        })
      ])
    } catch (e) {
      yield put(actions.invalidateCacheFailed(serializeError(e)))
      continue
    }
  }
}


export default function*() {
  yield take('@@INITIALIZED')
  yield fork(createLoop)
  yield fork(deleteLoop)
  yield fork(fetchLoop)
  yield fork(getLoop)
  yield fork(invalidateCacheLoop)
  yield fork(updateLoop)
  yield fork(inviteCollaboratorLoop)
  yield fork(deleteCollaboratorLoop)
  yield fork(makeOwnerLoop)
}
