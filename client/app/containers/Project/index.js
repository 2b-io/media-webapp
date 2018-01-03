import pick from 'object.pick'
import Radium from 'radium'
import React from 'react'

import { createProject, fetchProject, updateProject } from 'actions/project'
import AuthRequired from 'decorators/AuthRequired'
import Layout, { PERSONAL_MODE } from 'decorators/Layout'
import UIState from 'decorators/UIState'

import ProjectForm from './ProjectForm'
import style from './style'

@UIState('project', state => {
  return {
    projects: state.app.projects
  }
})
@Layout(PERSONAL_MODE)
@AuthRequired
@Radium
class Project extends React.Component {
  constructor(props) {
    super(props)

    this._processSaveProject = this._processSaveProject.bind(this)
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    const { action, slug } = match.params

    if (action === 'create') {
      //
    } else if (action === 'view') {
      dispatch(fetchProject(slug))
    }
  }

  render() {
    const { projects, match } = this.props
    const { action, slug } = match.params

    const project = projects[slug] || {}

    if (action === 'edit' && !project) return null

    const initialValues = {
      ...project,
      origins: (project.origins || []).join(',')
    }

    return (
      <div style={style.wrapper}>
        <div style={style.project}>
          <ProjectForm
            initialValues={initialValues}
            onSubmit={this._processSaveProject}
            update={!!initialValues._id}
          />
        </div>
      </div>
    )
  }

  _processSaveProject(form) {
    const { dispatch } = this.props
    const project = {
      ...form,
      origins: form.origins.split(',').filter(Boolean)
    }

    if (project._id) {
      dispatch(updateProject(project))
    } else {
      dispatch(createProject(project))
    }
  }
}

export default Project
