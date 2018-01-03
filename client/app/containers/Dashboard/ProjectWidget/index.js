import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import IconAdd from 'react-icons/lib/md/add'
import IconRefresh from 'react-icons/lib/md/refresh'

import { redirect } from 'actions/location'
import { fetchProjects } from 'actions/project'
import { InternalLink } from 'components/Link'

import style from './style'

@connect(state => ({
  projects: state.app.projects
}))
@Radium
class ProjectWidget extends React.Component {
  constructor(props) {
    super(props)

    this._processCreateProject = this._processCreateProject.bind(this)

    this._processRefreshProjects = this._processRefreshProjects.bind(this)
  }

  componentDidMount() {
    this._processRefreshProjects()
  }

  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.header}>
          <div style={style.title}>Projects</div>
          <div style={style.controls}>
            <div style={style.button}
              onClick={this._processCreateProject}>
              <IconAdd size={16} />
            </div>
            <div style={style.button}
              onClick={this._processRefreshProjects}>
              <IconRefresh size={16} />
            </div>
          </div>
        </div>
        <div style={style.content}>
          {this._renderContent()}
        </div>
      </div>
    )
  }

  _renderContent() {
    const { projects } = this.props

    if (!projects || Object.keys(projects).length === 0) {
      return (
        <p>
          <span>There is no project yet. </span><br />
          <span>Click <InternalLink link="/projects/create">here</InternalLink> to create your first project.</span>
        </p>
      )
    }

    return this._renderProjectList(projects)
  }

  _renderProjectList(projects) {
    return (
      <ul>
        { Object.keys(projects).map(slug => (
          <li key={slug}>
            <InternalLink
              link={`/projects/view/${slug}`}>
              <span>{projects[slug].name}</span>
            </InternalLink>
          </li>
        )) }
      </ul>
    )
  }

  _processCreateProject() {
    const { dispatch } = this.props

    dispatch(redirect('/projects/create'))
  }

  _processRefreshProjects() {
    const { dispatch } = this.props

    dispatch(fetchProjects())
  }
}

export default ProjectWidget
