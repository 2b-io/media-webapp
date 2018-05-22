import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default createReducer({})({
  [types.ACCEPT]: (state, action) => {
    return {
      ...state,
      last: state.current,
      current: action.payload.pathname
    }
  }
})
