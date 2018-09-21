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

      const { identifier } = action.payload
      const pullSetting = yield PullSetting.getPullSetting(session.token, identifier)
      yield put(actions.getPullSettingCompleted({ identifier, pullSetting }))
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

      const { identifier, pullSetting } = action.payload

      const updatedPullSetting = yield PullSetting.updatePullSetting(session.token, identifier, pullSetting)

      yield put(actions.updatePullSettingCompleted({
        identifier,
        pullSetting: updatedPullSetting
      }))
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
