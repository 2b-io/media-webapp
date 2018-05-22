import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default createReducer({
  last: null,
  current: null
})({
  [types.ACCEPT]: (state, action) => {
    return {
      ...state,
      last: state.current,
      current: action.payload.pathname
    }
  }
})
