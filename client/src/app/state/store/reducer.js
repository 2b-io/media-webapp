import { combineReducers } from 'redux'
import { reducers as duckReducers } from 'state/ducks'
import * as uiReducers from 'state/ui'

import form from './plugins/form'

const uiReducer = combineReducers({
  ...(
    Object.values(uiReducers).reduce(
      (reducers, { component, reducer }) => ({
        ...reducers,
        [ component ]: reducer
      }),
      {}
    )
  )
})

export default combineReducers({
  ...duckReducers,
  form,
  ui: (state = {}, action) => {
    if (action.type === '@@UI/CLEAR') {
      const {
        [ action.payload.component ]: removed,
        ...nextState
      } = state

      return nextState
    }

    return uiReducer(state, action)
  }
})
