import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import ProjectBlock from './project-block'

export default connect(
  (state) => {
    const pinnedProjectIdentifiers = selectors.pinnedProjectIdentifiers(state)
    return {
      pinnedProjects: selectors.pinnedProjects(state, pinnedProjectIdentifiers)
    }
  },
  mapDispatch({
    toCreateProject: () => actions.requestLocation('/projects/create'),
    toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`)
  })
)(ProjectBlock)
