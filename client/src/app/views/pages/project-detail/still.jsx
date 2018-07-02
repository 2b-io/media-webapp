import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { TitleBar } from 'ui/compounds'
import { Button, CollapsibleMenu } from 'ui/elements'
import { AddIcon, HelpIcon } from 'ui/icons'
import CreateProject from 'views/common/modals/create-project'

import { withParams } from 'views/router'

const ProjectDetail = ({ project }) => (
  <Fragment>
    <TitleBar>
      <TitleBar.Title>
        <h1>Project { project && project.name }</h1>
      </TitleBar.Title>
    </TitleBar>
    <CreateProject width="wide" />
  </Fragment>
)

export default withParams(
  connect(
    (state, { params: { slug } }) => {
      return {
        project: state.project.projects && state.project.projects[ slug ]
      }
    }
  )(ProjectDetail)
)
