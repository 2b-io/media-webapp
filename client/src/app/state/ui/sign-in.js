import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/session'

export default {
  component: 'SignIn',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.CREATE ]: () => false,
      [ types.CREATE_COMPLETED ]: () => true,
      [ types.CREATE_FAILED ]: () => true
    }),
    error: createReducer(null)({
      [ types.CREATE_COMPLETED ]: () => null,
      [ types.CREATE_FAILED ]: (state, action) => action.payload.reason
    }),
    result: createReducer(null)({
      [ types.CREATE_COMPLETED ]: (state, action) => action.payload.info,
      [ types.CREATE_FAILED ]: () => null
    })
  })
}
