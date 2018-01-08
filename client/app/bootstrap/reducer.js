import { combineReducers } from 'redux'

import { BOOTSTRAP } from 'actions/bootstrap'

import {reducer as burgerMenu} from 'redux-burger-menu'

import app from 'reducers/app'
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
  bootstrap: (state = false, action) => {
    if (action.type === BOOTSTRAP.BOOTSTRAP_SUCCESS) {
      return true
    }

    return state
  },
  burgerMenu,
  app,
  form,
  routing,
  ui
})
