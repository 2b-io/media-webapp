import Radium from 'radium'
import React from 'react'

import AuthRequired from 'decorators/AuthRequired'
import Layout, { PERSONAL_MODE } from 'decorators/Layout'
import UIState from 'decorators/UIState'

import ProjectForm from './ProjectForm'
import style from './style'

@UIState('project', state => ({
  project: state.app.project
}))
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
    console.log('render', this.props)
    const { project } = this.props

    return (
      <div style={style.wrapper}>
        <div style={style.project}>
          <ProjectForm project={project} />
        </div>
      </div>
    )
  }
}

export default Project
