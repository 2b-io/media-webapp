import { combineReducers } from 'redux'
import { reducers } from 'state/ducks'

import form from './plugins/form'

export default combineReducers({
  ...reducers,
  form
})
