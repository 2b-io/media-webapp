import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/project'

export default {
  component: 'modal/CacheInvalidatorModal',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.INVALID_CACHE ]: () => false,
      [ types.INVALID_CACHE_COMPLETED ]: () => true,
      [ types.INVALID_CACHE_FAILED ]: () => true,
    })
  })
}
