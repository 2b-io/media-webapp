import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default createReducer({})({
  [ types.SHOW ]: (state, action) => ({
    ...state,
    [ action.payload.modal ]: {
      params: action.payload.params
    }
  }),
  [ types.HIDE ]: (state, action) => ({
    ...state,
    [ action.payload.modal ]: null
  })
})
