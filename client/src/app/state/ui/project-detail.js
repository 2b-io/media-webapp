import { combineReducers } from 'redux'

import { types } from 'state/ducks/project'
import createReducer from 'state/helpers/create-reducer'

export default {
  component: 'ProjectDetail',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.DELETE ]: () => false,
      [ types.DELETE_COMPLETED ]: () => true,
      [ types.DELETE_FAILED ]: () => true,
      [ types.UPDATE ]: () => false,
      [ types.UPDATE_COMPLETED ]: () => true,
      [ types.UPDATE_FAILED ]: () => true
    }),
    notFound: createReducer(false)({
      [ types.GET_FAILED ]: () => true
    }),
    deleteError: createReducer(null)({
      [ types.DELETE_COMPLETED ]: () => null,
      [ types.DELETE_FAILED ]: (state, action) => action.payload.reason,
      [ types.UPDATE ]: () => null
    }),
    deleteResult: createReducer(null)({
      [ types.DELETE_COMPLETED ]: () => true,
      [ types.DELETE_FAILED ]: () => null,
      [ types.UPDATE ]: () => null
    }),
    updateError: createReducer(null)({
      [ types.DELETE ]: () => null,
      [ types.UPDATE_COMPLETED ]: () => null,
      [ types.UPDATE_FAILED ]: (state, action) => action.payload.reason
    }),
    updateResult: createReducer(null)({
      [ types.DELETE ]: () => null,
      [ types.UPDATE_COMPLETED ]: (state, action) => action.payload.project,
      [ types.UPDATE_FAILED ]: () => null
    }),

  })
}
