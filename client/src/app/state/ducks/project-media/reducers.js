import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  projectMedia: createReducer({})({
    [ types.FETCH_PROJECT_MEDIA_COMPLETED ]: (state, action) => action.payload.projectMedia
  })
})
