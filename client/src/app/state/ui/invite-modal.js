import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/account'

export default {
  component: 'modal/InviteCollaborator',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.SEARCH_ACCOUNT ]: () => false,
      [ types.SEARCH_ACCOUNT_COMPLETED ]: () => true,
      [ types.SEARCH_ACCOUNT_FAILED ]: () => true,
    }),
    error: createReducer(null)({
      [ types.SEARCH_ACCOUNT_COMPLETED ]: () => null,
      [ types.SEARCH_ACCOUNT_FAILED ]: (state, action) => action.payload.reason
    }),
    result: createReducer(null)({
      [ types.SEARCH_ACCOUNT_COMPLETED ]: (state, action) => action.payload.account.accounts,
      [ types.SEARCH_ACCOUNT_FAILED ]: () => null
    }),
    inputEmail: createReducer(null)({
      [ types.SEARCH_ACCOUNT_COMPLETED ]: (state, action) => action.payload.account.meta.inputEmail,
      [ types.SEARCH_ACCOUNT_FAILED ]: () => null
    }),
  })
}
