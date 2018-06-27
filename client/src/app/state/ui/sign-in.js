import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/interface'

export default {
  component: 'SignIn',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types['SESSION/CREATE'] ]: () => false,
      [ types['SESSION/CREATE_COMPLETED'] ]: () => true,
      [ types['SESSION/CREATE_FAILED'] ]: () => true
    }),
    error: createReducer(null)({
      [ types['SESSION/CREATE_COMPLETED'] ]: () => null,
      [ types['SESSION/CREATE_FAILED'] ]: (state, action) => action.payload.reason
    }),
    result: createReducer(null)({
      [ types['SESSION/CREATE_COMPLETED'] ]: (state, action) => action.payload.info,
      [ types['SESSION/CREATE_FAILED'] ]: () => null
    })
  })
}
