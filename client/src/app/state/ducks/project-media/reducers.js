import { combineReducers } from 'redux'
import arrayToMap from 'state/helpers/array-to-map'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  projectMedia: createReducer({})({
    [ types.FETCH_PROJECT_MEDIA_COMPLETED ]: (state, action) => {
      const { projectMedia }  = action.payload
      const { slug } = action.payload

      return {
        ...state,
        // [ slug ]: {
          projectMedia
        // }
      }
    }
  }),
})
