import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import AuthRequired from 'decorators/AuthRequired'
import Layout, { PERSONAL_MODE } from 'decorators/Layout'
import UIState from 'decorators/UIState'

@UIState('project')
@Layout(PERSONAL_MODE)
@AuthRequired
@Radium
class Project extends React.Component {
  componentDidMount() {
    const { params } = this.props.match

    if (params.action === 'create') {
      //
    }
  }

  render() {
    console.log(this.props)

    return (
      <h1>Project</h1>
    )
  }
}

export default Project
