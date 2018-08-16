import { combineReducers } from 'redux'

import { types } from 'state/ducks/project'
import createReducer from 'state/helpers/create-reducer'

export default {
  component: 'modal/Preset',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.CREATE_PRESET ]: () => false,
      [ types.CREATE_PRESET_COMPLETED ]: () => true,
      [ types.CREATE_PRESET_FAILED ]: () => true,
      [ types.DELETE_PRESET ]: () => false,
      [ types.DELETE_PRESET_COMPLETED ]: () => true,
      [ types.DELETE_PRESET_FAILED ]: () => true,
      [ types.UPDATE_PRESET ]: () => false,
      [ types.UPDATE_PRESET_COMPLETED ]: () => true,
      [ types.UPDATE_PRESET_FAILED ]: () => true
    }),
    createError: createReducer(null)({
      [ types.CREATE_PRESET_COMPLETED ]: () => null,
      [ types.CREATE_PRESET_FAILED ]: (state, action) => action.payload.reason,
      [ types.DELETE_PRESET ]: () => null,
      [ types.UPDATE_PRESET ]: () => null
    }),
    createResult: createReducer(null)({
      [ types.CREATE_PRESET_COMPLETED ]: (state, action) => action.payload.preset,
      [ types.CREATE_PRESET_FAILED ]: () => null,
      [ types.DELETE_PRESET ]: () => null,
      [ types.UPDATE_PRESET ]: () => null
    }),
    deleteError: createReducer(null)({
      [ types.CREATE_PRESET ]: () => null,
      [ types.DELETE_PRESET_COMPLETED ]: () => null,
      [ types.DELETE_PRESET_FAILED ]: (state, action) => action.payload.reason,
      [ types.UPDATE_PRESET ]: () => null
    }),
    deleteResult: createReducer(null)({
      [ types.CREATE_PRESET ]: () => null,
      [ types.DELETE_PRESET_COMPLETED ]: (state, action) => action.payload.preset,
      [ types.DELETE_PRESET_FAILED ]: () => null,
      [ types.UPDATE_PRESET ]: () => null
    }),
    updateError: createReducer(null)({
      [ types.CREATE_PRESET ]: () => null,
      [ types.DELETE_PRESET ]: () => null,
      [ types.UPDATE_PRESET_COMPLETED ]: () => null,
      [ types.UPDATE_PRESET_FAILED ]: (state, action) => action.payload.reason
    }),
    updateResult: createReducer(null)({
      [ types.CREATE_PRESET ]: () => null,
      [ types.DELETE_PRESET ]: () => null,
      [ types.UPDATE_PRESET_COMPLETED ]: (state, action) => action.payload.preset,
      [ types.UPDATE_PRESET_FAILED ]: () => null
    })
  })
}
