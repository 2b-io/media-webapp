import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default createReducer({})({
  [ types.GET_COMPLETED ]: (state, action) => ({
    ...state,
    [ action.payload.account.identifier ]: action.payload.account
  }),
  [ types.UPDATE_COMPLETED ]: (state, action) => ({
    ...state,
    [ action.payload.account.identifier ]: action.payload.account
  })
})
