import React from 'react'
import { connect } from 'react-redux'

import { selectors } from 'state/interface'
import { withParams } from 'views/router'

const ProjectDetail = ({ project }) => (
  <main>
    <h1>{ project && project.name }</h1>
  </main>
)

export default withParams(
  connect(
    (state, { params: { slug } }) => ({
      project: selectors.findProjectBySlug(state, slug)
    })
  )(ProjectDetail)
)
