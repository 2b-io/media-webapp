import { SESSION } from 'actions/session'

let initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case SESSION.VERIFY:
      return Object.assign({}, state, {
        id: Date.now()
      })
  }

  return state
}
