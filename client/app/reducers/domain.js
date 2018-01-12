import { combineReducers } from 'redux'

import project from './domain/project'
import session from './domain/session'

export default combineReducers({
  project,
  session
})
