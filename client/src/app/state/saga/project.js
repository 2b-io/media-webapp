import delay from 'delay'
import {call, take, fork, put} from 'redux-saga/effects'
import Project from 'models/project'
import {actions, types} from 'state/interface'

const projectList = function* (token) {
  try {
    const projects = yield call(Project.projectList, token)
    yield put(actions.receiveProjects(projects))
  } catch (e) {
    throw e
  }
}

const loop = function* () {
  while (true) {
    const action = yield take(types['PROJECT/REQUEST_LIST'])
    try {
      yield call(projectList, action.payload)
    } catch (e) {
      continue
    }
  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(loop)
}
