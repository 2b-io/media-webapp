import { PROFILE } from 'actions/profile'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE.SET:
      return Object.assign({}, state, {...action.profile })
  }

  return state
}
