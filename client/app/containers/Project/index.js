import Radium from 'radium'
import React from 'react'

import { createProject } from 'actions/project'
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
  constructor(props) {
    super(props)

    this._processSaveProject = this._processSaveProject.bind(this)
  }

  componentDidMount() {
    const { params } = this.props.match

    if (params.action === 'create') {
      //
    } else if (params.action === 'view') {
      console.log(params)
    }
  }

  render() {
    const { project } = this.props

    return (
      <div style={style.wrapper}>
        <div style={style.project}>
          <ProjectForm initialValues={project}
            onSubmit={this._processSaveProject} />
        </div>
      </div>
    )
  }

  _processSaveProject(project) {
    const { dispatch } = this.props

    dispatch(createProject(project))
  }
}

export default Project
