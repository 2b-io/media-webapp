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
    idleFetchEmail: createReducer(true)({
      [ types.FETCH_EMAIL ]: () => false,
      [ types.FETCH_EMAIL_COMPLETED ]: () => true,
      [ types.FETCH_EMAIL_FAILED ]: () => true,
    }),
    errorFetchEmail: createReducer(null)({
      [ types.FETCH_EMAIL_COMPLETED ]: () => null,
      [ types.FETCH_EMAIL_FAILED ]: (state, action) => action.payload
    }),
    resultFetchEmail: createReducer(null)({
      [ types.FETCH_EMAIL_COMPLETED ]: (state, action) => action.payload,
      [ types.FETCH_EMAIL_FAILED ]: () => null
    }),
    idleResetPassword: createReducer(true)({
      [ types.FETCH_PASSWORD_RESET ]: () => false,
      [ types.FETCH_PASSWORD_RESET_COMPLETED ]: () => true,
      [ types.FETCH_PASSWORD_RESET_FAILED ]: () => true,
    }),
    errorResetPassword: createReducer(null)({
      [ types.FETCH_PASSWORD_RESET_COMPLETED ]: () => null,
      [ types.FETCH_PASSWORD_RESET_FAILED ]: (state, action) => action.payload
    }),
    resultResetPassword: createReducer(null)({
      [ types.FETCH_PASSWORD_RESET_COMPLETED ]: (state, action) => action.payload,
      [ types.FETCH_PASSWORD_RESET_FAILED ]: () => null
    })
  })
}
