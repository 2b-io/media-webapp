import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { CollapsibleMenu, TitleBar } from 'ui/compounds'
import { Button } from 'ui/elements'
import { AddIcon, HelpIcon } from 'ui/icons'
import CreateProject from 'views/common/modals/create-project'

const ProjectList = ({ showModal }) => (
  <Fragment>
    <TitleBar>
      <TitleBar.Title>
        <h1>Projects</h1>
      </TitleBar.Title>

      <TitleBar.Menu>
        <CollapsibleMenu>
          <AddIcon medium inverted onClick={ showModal } />
          <HelpIcon medium inverted />
        </CollapsibleMenu>
      </TitleBar.Menu>
    </TitleBar>
    <CreateProject width="wide" />
  </Fragment>
)

export default connect(
  null,
  mapDispatch({
    showModal: () => ({
      type: '@@MODAL/SHOW',
      payload: { modal: 'CreateProject' }
    })
  })
)(ProjectList)
