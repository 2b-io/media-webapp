import { combineReducers } from 'redux'

import createReducer from 'state/helpers/create-reducer'
import * as types from './types'

export default combineReducers({
  closed: createReducer(true)({
    [ types.CLOSE ]: () => true,
    [ types.OPEN ]: () => false
  }),
  sidebarMinimized: createReducer(false)({
    [ types.MAXIMIZE_SIDEBAR ]: () => false,
    [ types.MINIMIZE_SIDEBAR ]: () => false
  }),
  stillHeight: createReducer(0)({
    [ types.UPDATE_STILL_HEIGHT ]: (state, action) => action.payload.height
  }),
  sidebarMaximized: createReducer(false)({
    [ types.MAXIMIZE_SIDEBAR ]: () => true,
    [ types.MINIMIZE_SIDEBAR ]: () => false
  }),
  sidebarMinimized: createReducer(false)({
    [ types.MINIMIZE_SIDEBAR ]: () => true,
    [ types.MAXIMIZE_SIDEBAR ]: () => false
  })
})
