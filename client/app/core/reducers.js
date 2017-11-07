import { combineReducers } from 'redux'

import history from 'components/History/reducer'

export default combineReducers({
  history,
  session: function(state = {}, action) {
    switch (action.type) {
      case 'GET_SESSION':
        return Object.assign({}, state, {
          id: Date.now()
        })
    }

    return state
  }
})
