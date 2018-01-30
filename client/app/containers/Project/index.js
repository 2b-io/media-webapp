import Radium from 'radium'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import pick from 'object.pick'
import splitLines from 'split-lines'

import { dismissModal, openModal } from 'actions/modal'
import { removePreset, updatePreset } from 'actions/preset'
import { createProject, fetchProject, removeProject, updateProject } from 'actions/project'
import Button from 'components/Button'
import ResponsiveBox from 'components/ResponsiveBox'
import { SystemLayout } from 'decorators/Layout'

import DeleteConfirmationModal from './DeleteConfirmationModal'
import PresetModal from './PresetModal'
import Form from './Form'
import PresetList from './PresetList'

import style from './style'

@connect(state => {
  const url = state.routing.location.pathname
  const match = state.routing.matches[url]
  const { action, slug } = match.params

  return {
    action,
    slug,
    project: (state.domain.projects || {})[slug]
  }
})
@SystemLayout
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
      origins: ((project && project.origins) || []).join('\n')
    }

    return (
      <div style={style.wrapper}>
        {this._renderPageTitle(action, project)}
        <Form
          initialValues={initialValues}
          onSubmit={this._processSaveProject}
          update={!!initialValues._id}
        />
        <PresetList
          project={initialValues}
          onClick={this._openPresetModal()}
        />
        {/* {this._renderUsage(initialValues)} */}
        {this._renderOtherControls(initialValues)}
        <DeleteConfirmationModal
          onOverlayClick={this._dismissDeleteConfirmation()}
          onAction={this._handleConfirmAction()}
        />
        <PresetModal
          onOverlayClick={this._dismissPresetModal()}
          onAction={this._handlePresetAction()}
        />
      </div>
    )
  }

  _openPresetModal() {
    const { dispatch } = this.props

    return preset => dispatch(openModal('preset', preset))
  }

  _dismissPresetModal() {
    const { dispatch } = this.props

    return () => dispatch(dismissModal('preset'))
  }

  _handlePresetAction() {
    const { dispatch } = this.props

    return (action, preset) => {
      dispatch(dismissModal('preset'))


      if (action !== 'save') return null

      dispatch(updatePreset(this.props.project, preset))
    }
  }

  _renderPageTitle(action, project = {}) {
    if (action === 'create') {
      return (
        <Helmet>
          <title>Create New Project</title>
        </Helmet>
      )
    }

    return (
      <Helmet>
        <title>{`Update Project [${project.name}]`}</title>
      </Helmet>
    )
  }

  _renderOtherControls(project) {
    if (!project._id) return null

    const { disabled = false } = project

    return (
      <ResponsiveBox style={style.other}>
        <Button type="button" style={style.toggleDisable}
          onClick={this._processToogleDisableProject(project)}>{ disabled ? 'enable' : 'disable'}</Button>
        <span style={style.delete}
          onClick={this._confirmDeleteProject(project)}>delete this project permanently</span>
      </ResponsiveBox>
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
          {`<img src="https://server1.mn-cdn.com/p/`}<b>{project.slug}</b>{`/media?width=`}<b>YOUR_DESIRED_WIDTH</b>{`&url=`}<b>YOUR_PUBLIC_IMAGE_URL</b>{`" />`}
        </code>
        <p style={style.desc}>
          Please note that <b>YOUR_PUBLIC_IMAGE_URL</b> should be a full URL of your public image. It should contain protocol and domain.<br />
          For example: <b>https://yourdomain.com/your_image.jpg</b>
        </p>
      </div>
    )
  }

  _dismissDeleteConfirmation() {
    const { dispatch } = this.props

    return () => dispatch(dismissModal('project-delete-confirmation'))
  }

  _confirmDeleteProject(project) {
    const { dispatch } = this.props

    return () => dispatch(openModal('project-delete-confirmation'))
  }

  _handleConfirmAction() {
    const { dispatch } = this.props

    return action => {
      console.log(action)

      dispatch(dismissModal('project-delete-confirmation'))
    }
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

  _processToogleDisableProject(project) {
    const { dispatch } = this.props

    return () => {
      dispatch(updateProject({
        ...project,
        disabled: !project.disabled
      }))
    }
  }
}

export default Project
