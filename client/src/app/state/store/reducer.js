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
      console.log('clearing...', action.payload.component)

      const {
        [ action.payload.component ]: removed,
        ...nextState
      } = state

      return nextState
    }

    return uiReducer(state, action)
  },
  modal: (state = {}, action) => {
    if (action.type === '@@MODAL/SHOW') {
      return {
        ...state,
        [ action.payload.modal ]: {
          params: action.payload.params 
        }
      }
    } else if (action.type === '@@MODAL/HIDE') {
      return {
        ...state,
        [ action.payload.modal ]: null
      }
    }

    return state
  }
})
