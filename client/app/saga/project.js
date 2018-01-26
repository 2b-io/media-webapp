import { call, fork, put, select, take } from 'redux-saga/effects'
import { PROJECT } from 'actions/project'
import Project from 'models/project'

export function* createProject() {
  while (true) {
    const action = yield take(PROJECT.CREATE_REQUEST)
    const session = yield select(state => state.domain.session)

    try {
      const project = yield call(Project.create, {
        project: action.payload,
        token: session.token
      })

      yield put({
        type: PROJECT.CREATE_SUCCESS,
        payload: project
      })
    } catch (error) {
      yield put({
        type: PROJECT.CREATE_FAILURE,
        error
      })
    }
  }
}

export function* fetchProject() {
  while (true) {
    const action = yield take(PROJECT.FETCH_REQUEST)
    const session = yield select(state => state.domain.session)

    try {
      const project = yield call(Project.fetch, {
        slug: action.payload,
        token: session.token
      })

      yield put({
        type: PROJECT.FETCH_SUCCESS,
        payload: project
      })
    } catch (error) {
      yield put({
        type: PROJECT.FETCH_FAILURE,
        error
      })
    }
  }
}

export function* fetchProjects() {
  while (true) {
    const action = yield take(PROJECT.FETCH_ALL_REQUEST)
    const session = yield select(state => state.domain.session)

    try {
      const projects = yield call(Project.fetchAll, {
        token: session.token
      })

      yield put({
        type: PROJECT.FETCH_ALL_SUCCESS,
        payload: projects
      })
    } catch (error) {
      yield put({
        type: PROJECT.FETCH_ALL_FAILURE,
        error
      })
    }
  }
}

export function* updateProject() {
  while (true) {
    const action = yield take(PROJECT.UPDATE_REQUEST)
    const session = yield select(state => state.domain.session)

    try {
      const project = yield call(Project.update, {
        project: action.payload,
        token: session.token
      })

      yield put({
        type: PROJECT.UPDATE_SUCCESS,
        payload: project
      })
    } catch (error) {
      yield put({
        type: PROJECT.UPDATE_FAILURE,
        error
      })
    }
  }
}

export default function* root() {
  yield fork(createProject)
  yield fork(fetchProject)
  yield fork(fetchProjects)
  yield fork(updateProject)
}
