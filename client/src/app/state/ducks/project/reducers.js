import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  projects: createReducer(null)({
    [types.RECEIVE_LIST]: (state, action) =>{
       return (action.payload)
     },
    [types.REQUEST_LIST]: (state, action)  =>{
       return state
     }
  })
})
