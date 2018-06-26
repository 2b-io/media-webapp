import { call, take, fork, put, select } from 'redux-saga/effects'
import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

const fetch = function* () {

  while (true) {
    yield take(types['PROJECT/FETCH'])
    try {
      const { token } = yield select(selectors.currentSession)
      if (!token) {
        continue
      }
      const projects =  yield call(Project.getProjectList, token)
      yield put(actions.receiveProjects(projects))
    } catch (e) {
      continue
    }
  }
}
const create = function* () {

  while (true) {
    const projectInfo = yield take(types['PROJECT/CREATE'])
    let project = projectInfo.payload
    try {
      const { token } = yield select(selectors.currentSession)
      if (!token) {
        continue
      }
      const dataProject =  yield call(Project.create, { project, token })
      yield put(actions.responseProject(dataProject))
      yield put(actions.updateListProject(dataProject))
    } catch (e) {
      continue
    }
  }
}

export default function* () {
  yield take('@@INITIALIZED')
  yield fork(fetch)
  yield fork(create)
}
