import { call, fork, put, select,   take } from 'redux-saga/effects'
import { PROJECT } from 'actions/project'
import { post } from 'services/rest'

export function* createProject() {
  while (true) {
    const action = yield take(PROJECT.CREATE_REQUEST)
    const session = yield select(state => state.app.session)

    try {
      const project = yield call(post, {
        url: '/api/projects',
        data: action.payload
      }, {
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

export default function* root() {
  yield fork(createProject)
}
