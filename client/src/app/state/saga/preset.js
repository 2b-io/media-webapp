import { call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import Project from 'models/project'
import { actions, types, selectors } from 'state/interface'

const getLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECT/GET_PRESET'])

    const { hash, slug } = action.payload

    try {
      const session = yield select(selectors.currentSession)

      const preset = yield call(Project.getPreset,
        { hash, slug },
        session.token
      )

      yield put(actions.getPresetCompleted(slug, preset))
    } catch (e) {
      yield put(actions.getPresetFailed(serializeError(e)))
      continue
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(getLoop)
}
