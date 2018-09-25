import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import ContextMenu from './context-menu'

export default connect(
  (state, { name }) => ({
    isActive: selectors.isMenuActive(state, name),
    stateless: true
  }),
  mapDispatch({
    activate: actions.showMenu,
    deactivate: actions.hideMenu
  })
)(ContextMenu)
