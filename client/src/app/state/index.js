import { combineReducers } from 'redux'

export const reducer = combineReducers({
  location: require('state/location/reducer').default
})
