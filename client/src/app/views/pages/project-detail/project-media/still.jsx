import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch, mapState } from 'services/redux-helpers'
import { TitleBar } from 'ui/compounds'
// import MediaDetail from 'views/common/modals/create-project'

const ProjectMedia = ({ stillHeight }) => (
  <Fragment>
    <TitleBar>
      <TitleBar.Title>
        <h1>Media List</h1>
      </TitleBar.Title>
    </TitleBar>
    {
      // <MediaDetail
      //   width="wide"
      //   title="Create New Project"
      // />
    }
  </Fragment>
)

export default connect(
  mapState({
    stillHeight: selectors.stillHeight
  }),
  null
  // mapDispatch({
    // showModal: () => actions.showModal({
    //   modal: 'MediaDetail'
    // })
  // })
)(ProjectMedia)
