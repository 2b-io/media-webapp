import { take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import PullSetting from 'models/pull-setting'
import { actions, types, selectors } from 'state/interface'

const getLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier
        }
      } = yield take(types.pullSetting.GET)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const pullSetting = yield PullSetting.getPullSetting(session.token, identifier)

      yield put(
        actions.getPullSettingCompleted({
          identifier, pullSetting
        })
      )
    } catch (e) {
      yield put(
        actions.getPullSettingFailed(serializeError(e))
      )
    }
  }
}

const updateLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier,
          pullSetting
        }
      } = yield take(types.pullSetting.UPDATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const updatedPullSetting = yield PullSetting.updatePullSetting(session.token, identifier, pullSetting)

      yield put(
        actions.updatePullSettingCompleted({
          identifier,
          pullSetting: updatedPullSetting
        })
      )
    } catch (e) {
      yield put(
        actions.updatePullSettingFailed(serializeError(e))
      )
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(getLoop)
  yield fork(updateLoop)
}
