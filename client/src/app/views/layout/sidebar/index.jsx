import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import Sidebar from './sidebar'

export default connect(
  mapState({
    open: selectors.maximizeSidebar,
    currentAccount: selectors.currentAccount,
    projectCount: selectors.projectCount
  }),
  mapDispatch({
    minimizeSidebar: actions.minimizeSidebar,
    signOut: () => actions.closeLayout(),
    toDashboard: () => actions.requestLocation('/'),
    toProfile: (identifier) => actions.requestLocation(`/@${ identifier }`),
    toProjectList: () => actions.requestLocation('/projects'),
    toReportPage: () => actions.requestLocation('/reports')
  })
)(Sidebar)
