import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import SidebarMini from './sidebar-mini'

export default connect(
  mapState({
    open: selectors.minimizeSidebar,
    currentAccount: selectors.currentAccount,
    projectCount: selectors.projectCount
  }),
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar,
    signOut: () => actions.closeLayout(),
    toDashboard: () => actions.requestLocation('/'),
    toProfile: (identifier) => actions.requestLocation(`/@${ identifier }`),
    toProjectList: () => actions.requestLocation('/projects')
  })
)(SidebarMini)
