import { combineReducers } from 'redux'

import { types } from 'state/ducks/project'
import createReducer from 'state/helpers/create-reducer'

export default {
  component: 'ProjectDetail',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.UPDATE ]: () => false,
      [ types.UPDATE_COMPLETED ]: () => true,
      [ types.UPDATE_FAILED ]: () => true
    }),
    error: createReducer(null)({
      [ types.UPDATE_COMPLETED ]: () => null,
      [ types.UPDATE_FAILED ]: (state, action) => action.payload.reason
    }),
    result: createReducer(null)({
      [ types.UPDATE_COMPLETED ]: (state, action) => action.payload.project,
      [ types.UPDATE_FAILED ]: () => null
    })
  })
}
