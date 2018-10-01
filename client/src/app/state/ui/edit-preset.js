import { combineReducers } from 'redux'

import { types } from 'state/ducks/preset'
import createReducer from 'state/helpers/create-reducer'

export default {
  component: 'EditPreset',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.DELETE ]: () => false,
      [ types.DELETE_COMPLETED ]: () => true,
      [ types.DELETE_FAILED ]: () => true,
      [ types.UPDATE ]: () => false,
      [ types.UPDATE_COMPLETED ]: () => true,
      [ types.UPDATE_FAILED ]: () => true
    }),
    notFoundPreset: createReducer(false)({
      [ types.GET_FAILED ]: () => true
    }),
    removePresetError: createReducer(null)({
      [ types.REMOVE_COMPLETED ]: () => null,
      [ types.REMOVE_FAILED ]: (state, action) => action.payload.reason,
      [ types.UPDATE ]: () => null
    }),
    removePresetResult: createReducer(null)({
      [ types.REMOVE_COMPLETED ]: () => true,
      [ types.REMOVE_FAILED ]: () => null,
      [ types.UPDATE ]: () => null
    }),
    updateError: createReducer(null)({
      [ types.DELETE ]: () => null,
      [ types.UPDATE_COMPLETED ]: () => null,
      [ types.UPDATE_FAILED ]: (state, action) => action.payload.reason
    }),
    updateResult: createReducer(null)({
      [ types.DELETE ]: () => null,
      [ types.UPDATE_COMPLETED ]: (state, action) => action.payload.preset,
      [ types.UPDATE_FAILED ]: () => null
    }),

  })
}
