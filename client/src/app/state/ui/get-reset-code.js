import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/reset-password-code'
export default {
  component: 'ResetPassword',
  reducer: combineReducers({
    idleGetCode: createReducer(true)({
      [ types.GET_RESET_CODE ]: () => false,
      [ types.GET_RESET_CODE_COMPLETED ]: () => true,
      [ types.GET_RESET_CODE_FAILED ]: () => true,
    }),
    errorGetCode: createReducer(null)({
      [ types.GET_RESET_CODE_COMPLETED ]: () => null,
      [ types.GET_RESET_CODE_FAILED ]: (state, action) => action.payload
    }),
    resultGetcode: createReducer(null)({
      [ types.GET_RESET_CODE_COMPLETED ]: (state, action) => action.payload,
      [ types.GET_RESET_CODE_FAILED ]: () => null
    }),
    idleForgotPassword: createReducer(true)({
      [ types.FORGOT_PASSWORD ]: () => false,
      [ types.FORGOT_PASSWORD_COMPLETED ]: () => true,
      [ types.FORGOT_PASSWORD_FAILED ]: () => true,
    }),
    errorForgotPassword: createReducer(null)({
      [ types.FORGOT_PASSWORD_COMPLETED ]: () => null,
      [ types.FORGOT_PASSWORD_FAILED ]: (state, action) => action.payload
    }),
    resultForgotPassword: createReducer(null)({
      [ types.FORGOT_PASSWORD_COMPLETED ]: (state, action) => action.payload,
      [ types.FORGOT_PASSWORD_FAILED ]: () => null
    }),
    idleResetPassword: createReducer(true)({
      [ types.RESET_PASSWORD ]: () => false,
      [ types.RESET_PASSWORD_COMPLETED ]: () => true,
      [ types.RESET_PASSWORD_FAILED ]: () => true,
    }),
    errorResetPassword: createReducer(null)({
      [ types.RESET_PASSWORD_COMPLETED ]: () => null,
      [ types.RESET_PASSWORD_FAILED ]: (state, action) => action.payload
    }),
    resultResetPassword: createReducer(null)({
      [ types.RESET_PASSWORD_COMPLETED ]: (state, action) => action.payload,
      [ types.RESET_PASSWORD_FAILED ]: () => null
    })
  })
}
