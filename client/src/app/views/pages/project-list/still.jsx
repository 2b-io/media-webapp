import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch, mapState } from 'services/redux-helpers'
import { TitleBar } from 'ui/compounds'
import { Button, CollapsibleMenu } from 'ui/elements'
import { AddIcon, HelpIcon } from 'ui/icons'

const ProjectList = ({ toCreateProject, stillHeight }) => (
  <Fragment>
    <TitleBar>
      <TitleBar.Title>
        <h1>All Projects</h1>
      </TitleBar.Title>

      <TitleBar.Menu>
        <CollapsibleMenu dock={ stillHeight }>
          <Button plain onClick={ toCreateProject }>
            <AddIcon size="medium" />
          </Button>
          <Button plain>
            <HelpIcon size="medium" />
          </Button>
        </CollapsibleMenu>
      </TitleBar.Menu>
    </TitleBar>
  </Fragment>
)

export default connect(
  mapState({
    stillHeight: selectors.stillHeight
  }),
  mapDispatch({
    toCreateProject: () => actions.requestLocation('/projects/create')
  })
)(ProjectList)
