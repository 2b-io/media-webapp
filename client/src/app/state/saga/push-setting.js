import { call, take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import PushSetting from 'models/push-setting'
import { actions, types, selectors } from 'state/interface'

const getLoop = function*() {
  while (true) {
    const action = yield take(types['PUSHSETTING/GET'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier } = action.payload
      const pushSetting = yield PushSetting.getPushSetting(session.token, identifier)
      yield put(actions.getPushSettingCompleted({ identifier, pushSetting }))
    } catch (e) {
      yield put(actions.getPushSettingFailed(serializeError(e)))
      continue
    }
  }
}

const updateLoop = function*() {
  while (true) {
    const action = yield take(types['PUSHSETTING/UPDATE'])

    try {
      const session = yield select(selectors.currentSession)

      if (!session) {
        continue
      }

      const { identifier, pushSetting } = action.payload

      const updatedPushSetting = yield PushSetting.updatePushSetting(session.token, identifier, pushSetting)

      yield put(actions.updatePushSettingCompleted({
        identifier,
        pushSetting: updatedPushSetting
      }))
    } catch (e) {
      yield put(actions.updatePushSettingFailed(serializeError(e)))
      continue
    }
  }
}


export default function*() {
  yield take('@@INITIALIZED')
  yield fork(getLoop)
  yield fork(updateLoop)
}
