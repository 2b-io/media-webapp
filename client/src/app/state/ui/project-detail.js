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
    })
  })
}
