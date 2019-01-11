import { all, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

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

      const newProject = yield Project.create({
        name,
        provider
      }, {
        token: session.token
      })

      if (!newProject) {
        throw 'Create project failed'
      }

      yield put(
        actions.createProjectCompleted(newProject)
      )
    } catch (e) {
      yield put(
        actions.createProjectFailed(serializeError(e))
      )
    }
  }
}

const removeLoop = function*() {
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

      const removed = yield Project.remove({
        identifier
      }, {
        token: session.token
      })

      if (!removed) {
        throw new 'Remove project failed'
      }

      yield put(
        actions.removeProjectCompleted(identifier)
      )
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

      const project = yield Project.get({
        identifier
      }, {
        token: session.token
      })

      if (!project) {
        throw 'Get project failed'
      }

      yield all([
        put(actions.getProjectCompleted(project))
      ])
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

      const projects = yield Project.fetch(null, {
        token: session.token
      })

      if (!projects) {
        throw 'Fetch project failed'
      }

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

      const updatedProject = yield Project.update({
        project
      }, {
        token: session.token
      })

      if (!updatedProject) {
        throw 'Project can not update'
      }

      yield put(
        actions.updateProjectCompleted(updatedProject)
      )
    } catch (e) {
      yield put(
        actions.updateProjectFailed(serializeError(e))
      )
    }
  }
}

const inviteCollaboratorsLoop = function*() {
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

      const collaborators = yield Project.inviteCollaborators({
        identifier,
        emails,
        message
      }, {
        token: session.token
      })

      if (!collaborators) {
        throw 'Invite collaborator failed'
      }

      yield put(
        actions.inviteCollaboratorCompleted(identifier, collaborators || [])
      )
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

      const removed = yield Project.deleteCollaborator({
        identifier,
        accountId
      }, {
        token: session.token
      })

      if (!removed) {
        throw 'Remove collaborator failed'
      }

      yield put(
        actions.deleteCollaboratorCompleted(identifier, accountId)
      )
    } catch (e) {
      yield put(
        actions.deleteCollaboratorFailed(serializeError(e))
      )
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

      const owner = yield Project.makeOwner({
        identifier,
        accountId
      }, {
        token: session.token
      })

      if (!owner) {
        throw 'Make owner failed'
      }

      yield put(
        actions.makeOwnerCompleted(identifier, session.account.identifier, accountId)
      )
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

      const invalidated = yield Project.invalidateCache({
        identifier,
        patterns
      }, {
        token: session.token
      })

      if (!invalidated) {
        throw 'Invalidate cache failed'
      }

      yield put(
        actions.invalidateCacheCompleted(identifier, patterns)
      )
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
  yield fork(removeLoop)
  yield fork(fetchLoop)
  yield fork(getLoop)
  yield fork(invalidateCacheLoop)
  yield fork(updateLoop)
  yield fork(inviteCollaboratorsLoop)
  yield fork(deleteCollaboratorLoop)
  yield fork(makeOwnerLoop)
}
