import { combineReducers } from 'redux'

import {reducer as burgerMenu} from 'redux-burger-menu'

import account from 'reducers/account'
import form from 'reducers/form'
import error from 'reducers/error'
import layout from 'reducers/layout'
import location from 'reducers/location'
import session from 'reducers/session'

export default combineReducers({
  account,
  burgerMenu,
  error,
  form,
  layout,
  location,
  session
})
