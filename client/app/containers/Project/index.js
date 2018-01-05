import pick from 'object.pick'
import Radium from 'radium'
import React from 'react'

import IconError from 'react-icons/lib/md/error'
import IconInfo from 'react-icons/lib/md/info'

import { createProject, fetchProject, updateProject } from 'actions/project'
import Redirect from 'components/Redirect'
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
    const { payload, error } = this.props['UI/project']
    const { projects, match } = this.props
    const { action, slug } = match.params

    if (payload && action === 'create') {
      return <Redirect path={`/projects/view/${payload.slug}`} />
    }

    const project = projects[slug] || {}

    if (action === 'view' && !project) return null

    const initialValues = {
      ...project,
      origins: (project.origins || []).join(',')
    }

    return (
      <div style={style.wrapper}>
        {this._renderSuccess(action, payload)}
        {this._renderError(action, error)}
        <div style={style.project}>
          <ProjectForm
            initialValues={initialValues}
            onSubmit={this._processSaveProject}
            update={!!initialValues._id}
          />
        </div>
        {this._renderUsage(project)}
      </div>
    )
  }

  _renderSuccess(action, payload) {
    if (!payload) return null

    return (
      <div style={style.success}>
        <IconInfo size={24} />
        <span style={style.successMessage}>
          {`Save the project successfully`}
        </span>
      </div>
    )
  }

  _renderError(action, error) {
    if (!error) return null

    return (
      <div style={style.error}>
        <IconError size={24} />
        <span style={style.errorMessage}>
          {`Error occurs when ${action === 'create' ? 'create' : 'update'} project`}
        </span>
      </div>
    )
  }

  _renderUsage(project) {
    if (!project._id) return null

    return (
      <div style={style.usage}>
        <label>Change your code</label>
        <code style={style.code}>
          {`<img src="`}<b>YOUR_PUBLIC_IMAGE_URL</b>{`" />`}
        </code>
        <label>To</label>
        <code style={style.code}>
          {`<img src="https://server1.mn-cdn.com/p/${project.slug}/media?width=`}<b>YOUR_DESIRED_WIDTH</b>{`&url=`}<b>YOUR_PUBLIC_IMAGE_URL</b>{`" />`}
        </code>
        <p style={style.desc}>
          Please note that <b>YOUR_PUBLIC_IMAGE_URL</b> should be a full URL of your public image. It should contain protocol and domain.<br />
          For example: <b>https://yourdomain.com/your_image.jpg</b>
        </p>
      </div>
    )
  }

  _processSaveProject(form) {
    const { dispatch } = this.props
    const project = {
      ...form,
      origins: form.origins.split(',').filter(Boolean).map(o => o.trim())
    }

    if (project._id) {
      dispatch(updateProject(project))
    } else {
      dispatch(createProject(project))
    }
  }
}

export default Project
