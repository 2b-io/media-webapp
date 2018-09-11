import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import ProjectBlock from './project-block'

export default connect(
  mapState({
    projects: selectors.allProjects,
  }),
  mapDispatch({
    toCreateProject: () => actions.requestLocation('/projects/create'),
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`)
  })
)(ProjectBlock)
