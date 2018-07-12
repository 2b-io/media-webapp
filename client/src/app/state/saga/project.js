import { call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

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

      yield put(actions.createProjectCompleted(newProject))
    } catch (e) {
      yield put(actions.createProjectFailed(serializeError(e)))
      continue
    }
  }
}

const createPresetLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/CREATE_PRESET'])
    const { preset } = action.payload

    try {
      const session = yield select(selectors.currentSession)
      const currentLocation = yield select(selectors.currentLocation)
      const { pathname } = currentLocation
      const slug = pathname.replace(/^.*[\\\/]/, '')
      if (!session) {
        continue
      }

      const newPreset = yield call(Project.createPreset, preset, slug, session.token)

      yield put(actions.createPresetCompleted(newPreset))
    } catch (e) {
      yield put(actions.createPresetFailed(serializeError(e)))
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

const getPresetLoop = function*() {
  while (true) {

    const action = yield take(types['PROJECT/GET_PRESET'])

    const { hash, project } = action.payload.preset

    try {
      const session = yield select(selectors.currentSession)

      if (!session || !hash || !project) {
        continue
      }

      const preset = yield call(Project.getPreset, session.token, project, hash)

      yield put(actions.getPresetCompleted(preset))
    } catch (e) {
      yield put(actions.getPresetFailed(serializeError(e)))
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

      yield put(actions.updateProjectCompleted(project))
    } catch (e) {
      yield put(actions.updateProjectFailed(serializeError(e)))
      continue
    }
  }
}

const updatePresetLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/UPDATE_PRESET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const preset = yield call(Project.updatePreset, action.payload.preset, session.token)

      yield put(actions.updatePresetCompleted(preset))
    } catch (e) {
      yield put(actions.updatePresetFailed(serializeError(e)))
      continue
    }
  }
}

const deletePresetLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/DELETE_PRESET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const destroy = yield call(Project.deletePreset, action.payload.preset, session.token)
      if (destroy) {
        yield put(actions.deletePresetCompleted(action.payload.preset))
      }
    } catch (e) {
      yield put(actions.deletePresetFailed(serializeError(e)))
      continue
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(createLoop)
  yield fork(createPresetLoop)
  yield fork(fetchLoop)
  yield fork(getLoop)
  yield fork(getPresetLoop)
  yield fork(updateLoop)
  yield fork(updatePresetLoop)
  yield fork(deletePresetLoop)
}
