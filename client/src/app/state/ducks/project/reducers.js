import { combineReducers } from 'redux'
import arrayToMap from 'state/helpers/array-to-map'
import createReducer from 'state/helpers/create-reducer'


import * as types from './types'

export default combineReducers({
  projects: createReducer(null)({
    [ types.FETCH_COMPLETED ]: (state, action) =>  arrayToMap(action.payload.projects, 'slug'),
    [ types.CREATE_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.slug ]: action.payload.project
    }),
    [ types.GET_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.slug ]: action.payload.project
    })
    //[types.UPDATE_COMPLETED]: ...
  })
  // project: createReducer(null)({
  //   [types.CREATE_COMPLETED]: (state, action) => action.payload.project
  // })
})
