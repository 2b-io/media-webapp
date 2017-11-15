import { combineReducers } from 'redux'

import history from 'reducers/history'
import session from 'reducers/session'

export default combineReducers({
  history,
  session: session
})
