import { call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import ProjectMedia from 'models/project-media'
import { actions, types, selectors } from 'state/interface'
import { addToast } from './toast'

const copyMediaLinkLoop = function*() {
  while(true) {
    yield take(types['PROJECTMEDIA/COPY_MEDIA_LINK'])
    yield fork(addToast, {
      type: 'success',
      message: 'Copied.'
    })
    continue
  }
}

const fetchProjectMediaLoop = function*() {
  while (true) {
    const action = yield take(types['PROJECTMEDIA/FETCH_PROJECT_MEDIA'])

    try {
      const session = yield select(selectors.currentSession)
      if (!session) {
        continue
      }

      const projectMediaList = yield call(ProjectMedia.fetchProjectMedia, session.token, action.payload.slug)
      yield put(actions.fetchProjectMediaCompleted(projectMediaList))
    } catch (e) {
      yield put(actions.fetchProjectMediaFailed(serializeError(e)))
      continue
    }
  }
}


export default function*() {
  yield take('@@INITIALIZED')
  yield fork(copyMediaLinkLoop)
  yield fork(fetchProjectMediaLoop)
}
