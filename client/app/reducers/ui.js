import { combineReducers } from 'redux'

import uiReducer from 'helpers/ui-reducer'

import layout from './ui/layout'
import location from './ui/location'
import signIn from './ui/sign-in'
import signUp from './ui/sign-up'

export default combineReducers({
  layout,
  location,
  signIn: uiReducer('signIn', signIn),
  signUp: uiReducer('signUp', signUp)
})
