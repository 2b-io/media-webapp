import { combineReducers } from 'redux'

import { reducer as burgerMenu } from 'redux-burger-menu'

import app from 'reducers/app'
import bootstrap from 'reducers/bootstrap'
import form from 'reducers/form'
import routing from 'reducers/routing'
import ui from 'reducers/ui'

// import account from 'reducers/account'
// import ajax from 'reducers/ajax'

// import error from 'reducers/error'
// import layout from 'reducers/layout'
// import location from 'reducers/location'
// import session from 'reducers/session'

export default combineReducers({
  app,
  bootstrap,
  burgerMenu,
  form,
  routing,
  ui
})
