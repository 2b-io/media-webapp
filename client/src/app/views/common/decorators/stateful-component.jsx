import { connect } from 'react-redux'

import { selectors } from 'state/interface'

export default ({ component }) => WrappedComponent => {
  console.warn(`stateful(${ component }) is deprecated`)

  return connect(
    (state) => {
      const currentLocation = selectors.currentLocation(state)

      if (!currentLocation) {
        return {}
      }

      return {
        ui: selectors.uiState(state, currentLocation.pathname)
      }
    }
  )(WrappedComponent)
}
