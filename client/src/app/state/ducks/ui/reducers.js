import * as types from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.INITIALIZE: {
      return {
        ...state,
        [ action.payload.path ]: action.payload.initialState
      }
    }

    case types.MERGE: {
      return {
        ...state,
        [ action.payload.path ]: {
          ...state[ action.payload.path ],
          ...action.payload.state
        }
      }
    }

    case types.REPLACE: {
      return {
        ...state,
        [ action.payload.path ]: action.payload.state
      }
    }
  }

  return state
}
