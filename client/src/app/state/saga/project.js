import { all, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

import { addToast } from './toast'

const createLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          name,
          provider
        }
      } = yield take(types.project.CREATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const newProject = yield Project.create(session.token, name, provider)

      yield all([
        put(
          actions.createProjectCompleted(newProject)
        ),
        fork(addToast, {
          type: 'success',
          message: 'Project created.'
        })
      ])
    } catch (e) {
      yield put(
        actions.createProjectFailed(serializeError(e))
      )
    }
  }
}

const deleteLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier
        }
      } = yield take(types.project.REMOVE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const removed = yield Project.remove(identifier, session.token)

      if (!removed) {
        throw new 'Remove project failed'
      }

      yield all([
        put(
          actions.removeProjectCompleted(identifier)
        ),
        fork(addToast, {
          type: 'success',
          message: 'Project deleted.'
        })
      ])
    } catch (e) {
      yield put(
        actions.removeProjectFailed(serializeError(e))
      )
    }
  }
}

const getLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier
        }
      } = yield take(types.project.GET)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const project = yield Project.get(identifier, session.token)

      yield put(
        actions.getProjectCompleted(project)
      )
    } catch (e) {
      yield put(
        actions.getProjectFailed(serializeError(e))
      )
    }
  }
}

const fetchLoop = function*() {
  while (true) {
    try {
      yield take(types.project.FETCH)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const projects = yield Project.fetch(session.token)

      yield put(
        actions.fetchProjectsCompleted(projects)
      )
    } catch (e) {
      yield put(
        actions.fetchProjectsFailed(serializeError(e))
      )
    }
  }
}

const updateLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          project
        }
      } = yield take(types.project.UPDATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const updatedProject = yield Project.update(project, session.token)

      yield all([
        put(
          actions.updateProjectCompleted(updatedProject)
        ),
        fork(addToast, {
          type: 'success',
          message: 'Project updated.'
        })
      ])
    } catch (e) {
      yield put(
        actions.updateProjectFailed(serializeError(e))
      )
    }
  }
}

const inviteCollaboratorLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier,
          emails,
          message
        }
      } = yield take(types.project.INVITE_COLLABORATOR)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const collaborators = yield Project.inviteCollaborator(session.token, identifier, emails, message)

      yield all([
        put(
          actions.inviteCollaboratorCompleted(identifier, collaborators || [])
        ),
        fork(addToast, {
          type: 'success',
          message: 'Collaborator invited.'
        })
      ])
    } catch (e) {
      yield put(
        actions.inviteCollaboratorFailed(serializeError(e))
      )
    }
  }
}

const deleteCollaboratorLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier,
          accountId
        }
      } = yield take(types.project.DELETE_COLLABORATOR)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const removed = yield Project.deleteCollaborator(session.token, identifier, accountId)

      if (!removed) {
        throw 'Remove collaborator failed'
      }

      yield all([
        put(
          actions.deleteCollaboratorCompleted(identifier, accountId)
        ),
        fork(addToast, {
          type: 'success',
          message: 'Collaborator deleted.'
        })
      ])
    } catch (e) {
      yield all([
        put(
          actions.deleteCollaboratorFailed(serializeError(e))
        ),
        fork(addToast, {
          type: 'error',
          message: 'Can not delete the collaborator.'
        })
      ])
    }
  }
}

const makeOwnerLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier,
          accountId
        }
      } = yield take(types.project.MAKE_OWNER)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const owner = yield Project.makeOwner(session.token, identifier, accountId)

      if (!owner) {
        throw 'Make owner failed'
      }

      yield all([
        put(
          actions.makeOwnerCompleted(identifier, session.account.identifier, accountId)
        ),
        fork(addToast, {
          type: 'success',
          message: 'Owner changed.'
        })
      ])

    } catch (e) {
      yield put(
        actions.makeOwnerFailed(serializeError(e))
      )
    }
  }
}

const invalidateCacheLoop = function*() {
  while(true) {
    try {
      const {
        payload: {
          identifier,
          patterns
        }
      } = yield take(types.project.INVALIDATE_CACHE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const invalidateCache = yield Project.invalidateCache(session.token, identifier, patterns)

      if (!invalidateCache) {
        throw 'Invalidate cache failed'
      }

      yield all([
        put(
          actions.invalidateCacheCompleted(identifier, patterns)
        ),
        fork(addToast, {
          type: 'success',
          message: 'Cache invalidated.'
        })
      ])
    } catch (e) {
      yield put(
        actions.invalidateCacheFailed(serializeError(e))
      )
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
