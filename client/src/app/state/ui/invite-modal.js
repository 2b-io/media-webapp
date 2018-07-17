import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/account'

export default {
  component: 'modal/InviteCollaborator',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.FIND ]: () => false,
      [ types.FIND_COMPLETED ]: () => true,
      [ types.FIND_FAILED ]: () => true,
    }),
    error: createReducer(null)({
      [ types.FIND_COMPLETED ]: () => null,
      [ types.FIND_FAILED ]: (state, action) => action.payload.reason
    }),
    result: createReducer(null)({
      [ types.FIND_COMPLETED ]: (state, action) => action.payload.collaborators,
      [ types.FIND_FAILED ]: () => null
    })
  })
}
