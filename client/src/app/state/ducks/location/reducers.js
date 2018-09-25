import * as types from './types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.ACCEPT:
      return {
        ...state,
        key: null,
        current: action.payload.pathname,
        previous: state.current
      }

    case types.INIT:
      return {
        ...state,
        current: action.payload.pathname
      }

    case types.UPDATE_KEY: {
      return {
        ...state,
        key: action.payload.key
      }
    }

    case types.UPDATE_PARAMS: {
      return {
        ...state,
        ...action.payload
      }
    }

    default:
      return state
  }
}
