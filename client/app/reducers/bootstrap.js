import { BOOTSTRAP } from 'actions/bootstrap'

export default function(state = false, action) {
  if (action.type === BOOTSTRAP.SUCCESS) {
    return true
  }

  return state
}
