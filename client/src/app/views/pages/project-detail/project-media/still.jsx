import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { TitleBar } from 'ui/compounds'

const ProjectMedia = () => (
  <Fragment>
    <TitleBar>
      <TitleBar.Title>
        <h1>Media List</h1>
      </TitleBar.Title>
    </TitleBar>
  </Fragment>
)

export default connect(
  null
)(ProjectMedia)
