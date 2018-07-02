import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { selectors } from 'state/interface'
import { TitleBar } from 'ui/compounds'

import { withParams } from 'views/router'

const ProjectDetail = ({ project }) => (
  <Fragment>
    <TitleBar>
      <TitleBar.Title>
        <h1>Project { project && project.name }</h1>
      </TitleBar.Title>
    </TitleBar>
  </Fragment>
)

export default withParams(
  connect(
    (state, { params: { slug } }) => ({
      project: selectors.findProjectBySlug(state, slug)
    })
  )(ProjectDetail)
)
