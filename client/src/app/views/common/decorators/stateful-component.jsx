import { connect } from 'react-redux'

import { selectors } from 'state/interface'

export default ({ component }) => WrappedComponent => {
  console.warn('stateful() is deprecated, use `selectors.uiState()` instead...')

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
