import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/account'

export default {
  component: 'ChangePassword',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.CHANGE_PASSWORD ]: () => false,
      [ types.CHANGE_PASSWORD_COMPLETED ]: () => true,
      [ types.CHANGE_PASSWORD_FAILED ]: () => true,
    }),
    error: createReducer(null)({
      [ types.CHANGE_PASSWORD_COMPLETED ]: () => null,
      [ types.CHANGE_PASSWORD_FAILED ]: (state, action) => action.payload.reason
    }),
    result: createReducer(null)({
      [ types.CHANGE_PASSWORD_COMPLETED ]: (state, action) => action.payload.account,
      [ types.CHANGE_PASSWORD_FAILED ]: () => null
    })
  })
}
