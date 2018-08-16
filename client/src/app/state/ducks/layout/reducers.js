import { combineReducers } from 'redux'

import createReducer from 'state/helpers/create-reducer'
import * as types from './types'

const MINIMAL_WIDTH = 44
const MAXIMAL_WIDTH = 180

export default combineReducers({
  closed: createReducer(true)({
    [ types.CLOSE ]: () => true,
    [ types.OPEN ]: () => false
  }),
  menuWidth: createReducer(MINIMAL_WIDTH)({
    [ types.MAXIMIZE_SIDEBAR ]: () => MAXIMAL_WIDTH,
    [ types.MINIMIZE_SIDEBAR ]: () => MINIMAL_WIDTH

  }),
  stillHeight: createReducer(0)({
    [ types.UPDATE_STILL_HEIGHT ]: (state, action) => action.payload.height
  }),
  sidebarMaximized: createReducer(false)({
    [ types.MAXIMIZE_SIDEBAR ]: () => true,
    [ types.MINIMIZE_SIDEBAR ]: () => false
  })
})
