import { combineReducers } from 'redux'

import locationReducer from 'state-logic/location/reducer'

export default combineReducers({
  location: locationReducer
})
