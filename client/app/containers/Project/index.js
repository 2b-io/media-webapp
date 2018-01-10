import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import pick from 'object.pick'
import splitLines from 'split-lines'

import IconError from 'react-icons/lib/md/error'
import IconInfo from 'react-icons/lib/md/info'

import { createProject, fetchProject, updateProject } from 'actions/project'
import Button from 'components/Button'
import Redirect from 'components/Redirect'
import AuthRequired from 'decorators/AuthRequired'
import Layout, { PERSONAL_MODE } from 'decorators/Layout'

import ProjectForm from './ProjectForm'
import style from './style'

@connect(state => {
  const url = state.routing.location.pathname
  const match = state.routing.matches[url]
  const { action, slug } = match.params

  return {
    action,
    slug,
    project: (state.app.projects || {})[slug]
  }
})
@Layout(PERSONAL_MODE)
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
    const { project, action, slug } = this.props

    if (action === 'view' && !project) return null

    const initialValues = {
      ...project,
      origins: ((project && project.origins) || []).join(',')
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
        {this._renderUsage(initialValues)}
        {this._renderOtherControls(initialValues)}
      </div>
    )
  }

  _renderOtherControls(project) {
    if (!project._id) return null

    return (
      <div style={style.other}>
        <Button type="button" style={style.toggleDisable}>disable</Button>

        <span style={style.delete}>delete this project permanently?</span>
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
      origins: splitLines(form.origins)
        .filter(Boolean)
        .reduce(
          (origins, line) => [
            ...origins,
            ...line.split(',').filter(Boolean).map(o => o.trim())
          ], []
        )
    }

    if (project._id) {
      dispatch(updateProject(project))
    } else {
      dispatch(createProject(project))
    }
  }
}

export default Project
