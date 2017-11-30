import { combineReducers } from 'redux'

import form from 'reducers/form'
import error from 'reducers/error'
import location from 'reducers/location'
import profile from 'reducers/profile'
import session from 'reducers/session'

export default combineReducers({
  error,
  form,
  location,
  profile,
  session
})
