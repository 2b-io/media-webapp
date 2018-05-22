import { combineReducers } from 'redux'

export const reducer = combineReducers({
  location: require('state-logic/location/reducer').default
})
