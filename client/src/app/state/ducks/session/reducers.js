import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default createReducer({
  info: null
})({
  [types.CREATE_COMPLETED]: (state, action) => {
    return { info: action.payload.info }
  },
  [types.DESTROY_COMPLETED]: (state, action) => {
    return { info: null }
  }
})
