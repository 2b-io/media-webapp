import delay from 'delay'
import {call, take, fork, put, select} from 'redux-saga/effects'
import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

const projectList = function* (token) {
  try {
    return yield call(Project.getProjectList, token)
  } catch (e) {
    throw e
  }
}

const loop = function* () {
  while (true) {
    const action = yield take(types['PROJECT/REQUEST_COMPLETED'])
    try {
      const session = yield select(selectors.currentSession)
      let projects =  yield call(projectList, session.token)
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
