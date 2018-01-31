import { fork } from 'redux-saga/effects'

import { PRESET } from 'actions/preset'
import showToast from './_toast'

export default {
  [PRESET.CREATE_FAILURE]: function* (action) {
    yield fork(showToast, {
      type: 'error',
      value: 'Error occurs when creating a preset.'
    }, false)
  },
  [PRESET.CREATE_SUCCESS]: function* (action) {
    const { preset } = action.payload

    yield fork(showToast, {
      type: 'info',
      value: `Create preset [${preset.name}] successfully.`
    })
  },
  [PRESET.REMOVE_SUCCESS]: function* (action) {
    yield fork(showToast, {
      type: 'error',
      value: 'The preset has been removed successfully.'
    })
  },
  [PRESET.UPDATE_FAILURE]: function* (action) {
    yield fork(showToast, {
      type: 'error',
      value: 'Error occurs when updating the preset.'
    })
  },
  [PRESET.UPDATE_SUCCESS]: function* (action) {
    const { preset } = action.payload

    yield fork(showToast, {
      type: 'info',
      value: `Update preset [${preset.name}] successfully.`
    })
  }
}
