import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import IconAdd from 'react-icons/lib/md/add'
import IconRefresh from 'react-icons/lib/md/refresh'

import { fetchProjects } from 'actions/project'
import { InternalLink } from 'components/Link'

import style from './style'

@connect(state => ({
  projects: state.app.project.all
}))
@Radium
class ProjectWidget extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(fetchProjects())
  }

  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.header}>
          <div style={style.title}>Projects</div>
          <div style={style.controls}>
            <div style={style.button}>
              <IconAdd size={16} />
            </div>
            <div style={style.button}>
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

    if (!projects || projects.length === 0) {
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
        { projects.map(p => <li key={p._id}>{p.name}</li>)}
      </ul>
    )
  }
}

export default ProjectWidget
