import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/project'

export default {
  component: 'modal/CacheInvalidatorModal',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.INVALIDATE_CACHE ]: () => false,
      [ types.INVALIDATE_CACHE_COMPLETED ]: () => true,
      [ types.INVALIDATE_CACHE_FAILED ]: () => true,
    }),
    result: createReducer(null)({
      [ types.INVALIDATE_CACHE_COMPLETED ]: () => true,
      [ types.INVALIDATE_CACHE_FAILED ]: () => false
    }),
    error: createReducer(null)({
      [ types.INVALIDATE_CACHE_COMPLETED ]: () => false,
      [ types.INVALIDATE_CACHE_FAILED ]: () => true
    })
  })
}
