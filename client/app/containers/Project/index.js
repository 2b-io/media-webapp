import Radium from 'radium'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import pick from 'object.pick'
import splitLines from 'split-lines'

import { dismissModal, openModal } from 'actions/modal'
import { createPreset, removePreset, updatePreset } from 'actions/preset'
import { createProject, fetchProject, removeProject, updateProject } from 'actions/project'
import Button from 'components/Button'
import ResponsiveBox from 'components/ResponsiveBox'
import { SystemLayout } from 'decorators/Layout'

import DeleteConfirmationModal from './DeleteConfirmationModal'
import IntegrateModal from './IntegrateModal'
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
          onShowCodeClick={this._openIntegrateModal(project)}
        />
        {/* {this._renderUsage(initialValues)} */}
        {this._renderOtherControls(initialValues)}
        <DeleteConfirmationModal
          onOverlayClick={this._dismissModal('project-delete-confirmation')}
          onAction={this._handleConfirmAction(project)}
        />
        <PresetModal
          onAction={this._handlePresetAction(project)}
        />
        <IntegrateModal
          onOverlayClick={this._dismissModal('integrate')}
        />
      </div>
    )
  }

  _openIntegrateModal(project) {
    const { dispatch } = this.props

    return preset => dispatch(
      openModal('integrate', {
        preset,
        project
      })
    )
  }

  _dismissModal(name) {
    const { dispatch } = this.props

    return () => dispatch(dismissModal(name))
  }

  _openPresetModal() {
    const { dispatch } = this.props

    return (preset = {}) => dispatch(openModal('preset', preset))
  }

  _handlePresetAction(project) {
    const { dispatch } = this.props

    return (action, preset) => {
      dispatch(dismissModal('preset'))

      switch (action) {
        case 'save':
          return preset.hash ?
            dispatch(updatePreset(project, preset)) :
            dispatch(createPreset(project, preset))

        case 'delete':
          return dispatch(removePreset(project, preset))
      }
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

  _confirmDeleteProject(project) {
    const { dispatch } = this.props

    return () => dispatch(openModal('project-delete-confirmation'))
  }

  _handleConfirmAction(project) {
    const { dispatch } = this.props

    return action => {
      console.log(action)

      dispatch(dismissModal('project-delete-confirmation'))

      if (action === 'confirm') {
        dispatch(removeProject(project))
      }
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
