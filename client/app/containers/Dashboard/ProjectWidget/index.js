import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import IconAdd from 'react-icons/lib/md/add'
import IconRefresh from 'react-icons/lib/md/refresh'
import { InternalLink } from 'components/Link'

import style from './style'

@connect()
@Radium
class ProjectWidget extends React.Component {
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
          {this._renderProjects()}
        </div>
      </div>
    )
  }

  _renderProjects() {
    const { projects } = this.props

    if (!projects || projects.length === 0) {
      return (
        <p>
          <span>There is no project yet. </span><br />
          <span>Click <InternalLink path="/create-project">here</InternalLink> to create your first project.</span>
        </p>
      )
    }

    return null
  }
}

export default ProjectWidget
