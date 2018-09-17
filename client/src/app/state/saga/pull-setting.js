import { call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import PullSetting from 'models/pull-setting'
import { actions, types, selectors } from 'state/interface'

const getLoop = function*() {
  while (true) {
    const action = yield take(types['PULLSETTING/GET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const identifier = action.payload
      const pullSetting = yield call(PullSetting.getPullSetting, session.token, identifier)
      yield put(actions.getPullSettingCompleted( pullSetting ))
    } catch (e) {
      yield put(actions.getPullSettingFailed(serializeError(e)))
      continue
    }
  }
}

const updateLoop = function*() {
  while (true) {
    const action = yield take(types['PULLSETTING/UPDATE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const pullSetting = action.payload
      const newPullSetting = yield call(PullSetting.updatePullSetting, session.token, pullSetting)

      yield put(actions.updatePullSettingCompleted(newPullSetting))
    } catch (e) {
      yield put(actions.updatePullSettingFailed(serializeError(e)))
      continue
    }
  }
}


export default function*() {
  yield take('@@INITIALIZED')
  yield fork(getLoop)
  yield fork(updateLoop)
}
