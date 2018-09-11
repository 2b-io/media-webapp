import { connect } from 'react-redux'

import preventDefault from 'services/prevent-default'
import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import ProjectBlock from './project-block'

export default connect(
  mapState({
    projects: selectors.allProjects,
  }),
  mapDispatch({
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`)
  })
)(ProjectBlock)
