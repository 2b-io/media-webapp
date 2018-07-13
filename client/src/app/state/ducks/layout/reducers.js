import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  closed: createReducer(true)({
    [ types.CLOSE ]: () => true,
    [ types.OPEN ]: () => false
  }),
  stillHeight: createReducer(0)({
    [ types.UPDATE_STILL_HEIGHT ]: (state, action) => action.payload.height
  })
})
