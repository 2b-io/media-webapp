import { combineReducers } from 'redux'

import { types } from 'state/ducks/preset'
import createReducer from 'state/helpers/create-reducer'

export default {
  component: 'modal/Preset',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.CREATE ]: () => false,
      [ types.CREATE_COMPLETED ]: () => true,
      [ types.CREATE_FAILED ]: () => true
    }),
    createError: createReducer(null)({
      [ types.CREATE_COMPLETED ]: () => null,
      [ types.CREATE_FAILED ]: (state, action) => action.payload.reason
    }),
    createResult: createReducer(null)({
      [ types.CREATE_COMPLETED ]: (state, action) => action.payload.preset,
      [ types.CREATE_FAILED ]: () => null
    })
  })
}
