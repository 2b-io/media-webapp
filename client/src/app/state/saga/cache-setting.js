import { take, fork, put, select } from 'redux-saga/effects'
import serializeError from 'serialize-error'

import CacheSetting from 'models/cache-setting'
import { actions, types, selectors } from 'state/interface'

const getLoop = function*() {
  while (true) {
    try {
      const {
        payload: {
          identifier
        }
      } = yield take(types.cacheSetting.GET)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const cacheSetting = yield CacheSetting.get({
        identifier
      }, {
        token: session.token
      })

      if (!cacheSetting) {
        throw 'Get cache setting failed'
      }

      yield put(
        actions.getCacheSettingCompleted({
          identifier,
          cacheSetting
        })
      )
    } catch (e) {
      yield put(
        actions.getCacheSettingFailed(serializeError(e))
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
          cacheSetting
        }
      } = yield take(types.cacheSetting.UPDATE)

      const session = yield select(selectors.currentSession)

      if (!session) {
        throw 'Unauthorized'
      }

      const newCacheSetting = yield CacheSetting.update({
        identifier,
        cacheSetting
      }, {
        token: session.token
      })

      if (!newCacheSetting) {
        throw 'Update cache setting failed'
      }

      yield put(
        actions.updateCacheSettingCompleted({
          identifier,
          cacheSetting: newCacheSetting
        })
      )
    } catch (e) {
      yield put(
        actions.updateCacheSettingFailed(serializeError(e))
      )
    }
  }
}

export default function*() {
  yield take('@@INITIALIZED')
  yield fork(getLoop)
  yield fork(updateLoop)
}
