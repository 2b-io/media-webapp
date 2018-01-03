import { combineReducers } from 'redux'

import project from './app/project'
import session from './app/session'

export default combineReducers({
  project,
  session
})
