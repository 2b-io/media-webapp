import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

const MINIMAL_WIDTH = 44
const FULL_WIDTH = 150

export default combineReducers({
  closed: createReducer(true)({
    [ types.CLOSE ]: () => true,
    [ types.OPEN ]: () => false
  }),
  menuWidth: createReducer(MINIMAL_WIDTH)({
    [ types.UPDATE_MENU_WIDTH ]: (state, action) => action.payload.width
  }),
  stillHeight: createReducer(0)({
    [ types.UPDATE_STILL_HEIGHT ]: (state, action) => action.payload.height
  })
})
