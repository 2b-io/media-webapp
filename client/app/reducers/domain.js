import { combineReducers } from 'redux'

import projects from './domain/projects'
import session from './domain/session'

export default combineReducers({
  projects,
  session
})
