import { all, call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

import { addToast } from './toast'

const createLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/CREATE'])
    const { project } = action.payload

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const newProject = yield call(Project.create, project, session.token)

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
    const action = yield take(types['PROJECT/DELETE'])
    const { slug } = action.payload

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const deleted = yield Project.delete(slug, session.token)

      if (!deleted) {
        throw new Error('Cannot delete project')
      }

      yield all([
        put(actions.deleteProjectCompleted(slug)),
        fork(addToast, {
          type: 'success',
          message: 'Project deleted.'
        })
      ])
    } catch (e) {
      yield put(actions.deleteProjectFailed(serializeError(e)))
      continue
    }
  }
}

const getLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/GET'])
    const { slug } = action.payload

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const project = yield call(Project.get, slug, session.token)

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
    const currentLocation = yield select(selectors.currentLocation)
    const slug = currentLocation.pathname.split('/')[2]
    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const collaborator = yield call(Project.inviteCollaborator, session.token, slug, action.payload )
      collaborator.slug = slug
      if (collaborator) {
        yield all([
          put(actions.inviteCollaboratorCompleted(collaborator)),
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

const makeOwnerLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/MAKE_OWNER'])

    try {
      const session = yield select(selectors.currentSession)
      if (!session) {
        continue
      }

      const owner = yield call(Project.makeOwner, session.token, action.payload.slug, action.payload.accountId)
      if (owner) {
        yield all([
          put(actions.makeOwnerCompleted(action.payload.slug, session.account._id, action.payload.accountId)),
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

const invalidCacheLoop = function*() {
  while(true) {
    const action = yield take(types['PROJECT/INVALID_CACHE'])
    try {

      //Do something
      yield all([
        fork(addToast, {
          type: 'success',
          message: 'Cache invalidated.'
        })
      ])

    } catch (e) { }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(createLoop)
  yield fork(deleteLoop)
  yield fork(invalidCacheLoop)
  yield fork(fetchLoop)
  yield fork(getLoop)
  yield fork(updateLoop)
  yield fork(inviteCollaboratorLoop)
  yield fork(makeOwnerLoop)
}
