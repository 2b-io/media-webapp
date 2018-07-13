import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { TitleBar } from 'ui/compounds'
import { Button, CollapsibleMenu } from 'ui/elements'
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
          <Button plain onClick={ showModal }>
            <AddIcon size="medium" />
          </Button>
          <Button plain>
            <HelpIcon size="medium" />
          </Button>
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
