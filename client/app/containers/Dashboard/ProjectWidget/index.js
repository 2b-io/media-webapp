import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import IconAdd from 'react-icons/lib/md/add'
import IconRefresh from 'react-icons/lib/md/refresh'

import { fetchProjects } from 'actions/project'
import { redirect } from 'actions/routing'
import { InternalLink } from 'components/Link'

import style from './style'

@connect(state => ({
  projects: state.domain.project
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
        { Object.keys(projects).map(slug => {
          const project = projects[slug]

          if (!project) return null

          return (
            <li key={slug} style={style.project}>
              <InternalLink style={style.projectName}
                link={`/projects/view/${slug}`}>
                <span>{project.name}</span>
              </InternalLink>
              <span> ({slug})</span>
              <p style={style.projectOrigins}>{project.origins.join(', ')}</p>
            </li>
          )
        }) }
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
