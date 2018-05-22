import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default createReducer({})({
  [types.CREATE_COMPLETED]: (state, action) => {
    return { session: action.payload.info }
  },
  [types.DESTROY_COMPLETED]: (state, action) => {
    return {}
  }
})
