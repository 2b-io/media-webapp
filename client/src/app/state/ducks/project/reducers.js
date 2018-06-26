import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  projects: createReducer(null)({
    [types.FETCH_COMPLETED]: (state, action) =>  action.payload.projects,
    [types.UPDATE]: (state, action) => [ ...state, action.payload ],
  }),
  project: createReducer(null)({
    [types.CREATE_COMPLETED]: (state, action) => action.payload.project,
  })
})
