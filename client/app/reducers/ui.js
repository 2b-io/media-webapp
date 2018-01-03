import { combineReducers } from 'redux'

import uiReducer from 'helpers/ui-reducer'

import layout from './ui/layout'
import location from './ui/location'
import project from './ui/project'
import signIn from './ui/sign-in'
import signUp from './ui/sign-up'

export default combineReducers({
  layout,
  location,
  ...uiReducer('project', project),
  ...uiReducer('signIn', signIn),
  ...uiReducer('signUp', signUp)
})
