import { take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import PinnedProject from 'models/pinned-project'
import { actions, types, selectors } from 'state/interface'

const listLoop = function*() {
  while (true) {
    try {
      yield take(types.pinnedProjects.LIST)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const pinnedProjects = yield PinnedProject.get(null, {
        token: session.token
      })

      if (!pinnedProjects) {
        throw 'Get pin projects failed'
      }

      yield put(
        actions.listPinnedProjectsCompleted(
          pinnedProjects
        )
      )
    } catch (e) {
      yield put(
        actions.listPinnedProjectsFailed(serializeError(e))
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
      } = yield take(types.pinnedProjects.UPDATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const pinnedProjects = yield PinnedProject.update({
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
  yield fork(listLoop)
  yield fork(updateLoop)
}
