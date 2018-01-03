import { combineReducers } from 'redux'

import projects from './app/projects'
import session from './app/session'

export default combineReducers({
  projects,
  session
})
