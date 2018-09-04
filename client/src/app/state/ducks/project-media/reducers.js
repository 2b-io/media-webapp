import { combineReducers } from 'redux'
import arrayToMap from 'state/helpers/array-to-map'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  projectMedia: createReducer({})({
    [ types.FETCH_PROJECT_MEDIA_COMPLETED ]: (state, action) => arrayToMap(action.payload.projectMedia, 'id'),

    [ types.REMOVE_PROJECT_MEDIA_COMPLETED ]: (state, action) => {
      const { id }  = action.payload
      const { [ id ]: idToRemove, ...newState } = state

      return newState
    }
  })
})

