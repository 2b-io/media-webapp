import { call, take, fork, put, select } from 'redux-saga/effects'
import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

const loop = function* () {
  while (true) {
    yield take(types['PROJECT/FETCH'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const projects =  yield call(Project.getProjectList, session.token)

      yield put(actions.receiveProjects(projects))
    } catch (e) {
      continue
    }
  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(loop)
}
