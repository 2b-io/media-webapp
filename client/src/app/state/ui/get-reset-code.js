import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/reset-password-code'
export default {
  component: 'ResetPassword',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.GET_RESET_CODE ]: () => false,
      [ types.GET_RESET_CODE_COMPLETED ]: () => true,
      [ types.GET_RESET_CODE_FAILED ]: () => true,
    }),
    error: createReducer(null)({
      [ types.GET_RESET_CODE_COMPLETED ]: () => null,
      [ types.GET_RESET_CODE_FAILED ]: (state, action) => action.payload.reason
    }),
    result: createReducer(null)({
      [ types.GET_RESET_CODE_COMPLETED ]: (state, action) => {console.log("state",state); return action.payload.resetPasswordCode},
      [ types.GET_RESET_CODE_FAILED ]: () => null
    })
  })
}
