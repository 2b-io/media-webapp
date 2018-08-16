import { combineReducers } from 'redux'

import { AJAX } from 'actions/ajax'

const initialState = {
  requests: 0
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case AJAX.REQUEST:
      return {
        ...state,
        requests: state.requests + 1
      }
    case AJAX.SUCCESS:
      return {
        ...state,
        requests: state.requests - 1,
        [action.payload.id]: {
          data: action.payload.data,
          error: null
        }
      }
    case AJAX.FAILURE:
      return {
        ...state,
        requests: state.requests - 1,
        [action.payload.id]: {
          data: null,
          error: action.payload.error
        }
      }

    case AJAX.CLEAR:
      return action.payload.id ? {
          ...state,
          [action.payload.id]: {}
        } : {
          requests: state.requests
        }
  }

  return state
}
