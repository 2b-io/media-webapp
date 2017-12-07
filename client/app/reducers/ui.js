import { combineReducers } from 'redux'

import layout from './ui/layout'
import location from './ui/location'
import signUp from './ui/sign-up'

export default combineReducers({
  layout,
  location,
  signUp
})
