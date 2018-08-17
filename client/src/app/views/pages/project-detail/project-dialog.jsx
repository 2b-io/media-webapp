import React from 'react'
import { connect } from 'react-redux'


import { dialog } from 'views/common/decorators'

const ProjectDialog = ({ content, choices }) => (
  <div>
    <div>{ content() }</div>
    <div>{ choices() }</div>
  </div>
)

export default dialog({
  name: 'ProjectDialog'
})(
  connect(
    null
  )(ProjectDialog)
)

