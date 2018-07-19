import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch, mapState } from 'services/redux-helpers'
import { TitleBar } from 'ui/compounds'
import { Button, CollapsibleMenu } from 'ui/elements'
import { AddIcon, HelpIcon } from 'ui/icons'
import CreateProject from 'views/common/modals/create-project'

const ProjectList = ({ showModal, stillHeight }) => (
  <Fragment>
    <TitleBar>
      <TitleBar.Title>
        <h1>Projects</h1>
      </TitleBar.Title>

      <TitleBar.Menu>
        <CollapsibleMenu dock={ stillHeight }>
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
  mapState({
    stillHeight: selectors.stillHeight
  }),
  mapDispatch({
    showModal: () => actions.showModal({
      modal: 'CreateProject'
    })
  })
)(ProjectList)
