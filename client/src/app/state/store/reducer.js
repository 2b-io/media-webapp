import { combineReducers } from 'redux'
import * as innerReducers from 'state/ducks'

export default combineReducers(innerReducers)
