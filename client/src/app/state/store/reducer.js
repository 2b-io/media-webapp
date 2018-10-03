import { combineReducers } from 'redux'
import { reducers } from 'state/ducks'

import form from './plugins/form'

const combined = combineReducers({
  ...reducers,
  form
})

export default (state = {}, action) => {
  if (action.type === '@@RESET') {
    return combined({}, action)
  }

  return combined(state, action)
}
