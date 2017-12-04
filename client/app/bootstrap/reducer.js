import { combineReducers } from 'redux'

import {reducer as burgerMenu} from 'redux-burger-menu'

import form from 'reducers/form'
import error from 'reducers/error'
import location from 'reducers/location'
import profile from 'reducers/profile'
import session from 'reducers/session'

export default combineReducers({
  burgerMenu,
  error,
  form,
  location,
  profile,
  session
})
