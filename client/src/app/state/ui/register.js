import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/account'

export default {
  component: 'Register',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.REGISTER ]: () => false,
      [ types.REGISTER_COMPLETED ]: () => true,
      [ types.REGISTER_FAILED ]: () => true,
    }),
    error: createReducer(null)({
      [ types.REGISTER_COMPLETED ]: () => null,
      [ types.REGISTER_FAILED ]: (state, action) => action.payload.reason
    }),
    result: createReducer(null)({
      [ types.REGISTER_COMPLETED ]: (state, action) => action.payload.account,
      [ types.REGISTER_FAILED ]: () => null
    })
  })
}
