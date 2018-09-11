import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import Sidebar from './sidebar'

export default connect(
  mapState({
    open: selectors.isSidebarOpen,
    currentAccount: selectors.currentAccount
  }),
  mapDispatch({
    minimizeSidebar: actions.minimizeSidebar,
    toDashboard: () => actions.requestLocation('/'),
    toProjectList: () => actions.requestLocation('/projects'),
    toUI: () => actions.requestLocation('/ui'),
    signOut: () => actions.closeLayout()
  })
)(Sidebar)
