import { take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import PinProject from 'models/pin-project'
import { actions, types, selectors } from 'state/interface'

const fetchLoop = function*() {
  while (true) {
    try {
      yield take(types.pinProject.FETCH)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const pinnedProjects = yield PinProject.get(null, {
        token: session.token
      })

      if (!pinnedProjects) {
        throw 'Get pin projects failed'
      }

      yield put(
        actions.fetchPinnedProjectsCompleted(
          pinnedProjects
        )
      )
    } catch (e) {
      yield put(
        actions.fetchPinnedProjectsFailed(serializeError(e))
      )
    }
  }
}

const updateLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          projectIdentifiers
        }
      } = yield take(types.pinProject.UPDATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const pinnedProjects = yield PinProject.update({
        projectIdentifiers
      }, {
        token: session.token
      })

      if (!pinnedProjects) {
        throw 'Update pin projects failed'
      }

      yield put(
        actions.updatePinnedProjectsCompleted(pinnedProjects)
      )
    } catch (e) {
      yield put(
        actions.updatePinnedProjectsFailed(serializeError(e))
      )
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(fetchLoop)
  yield fork(updateLoop)
}
