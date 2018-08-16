import { combineReducers } from 'redux'

import layout from './ui/layout'
import modal from './ui/modal'
import message from './ui/message'

export default combineReducers({
  layout,
  modal,
  message,
})
