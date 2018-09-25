import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import _ContextMenu from './context-menu'

const ContextMenu = connect(
  (state, { name }) => ({
    isActive: selectors.isMenuActive(state, name),
    stateless: true
  }),
  mapDispatch({
    activate: actions.showMenu,
    deactivate: actions.hideMenu
  })
)(_ContextMenu)

ContextMenu.Menu = _ContextMenu

export default ContextMenu
