import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import style from './style'

@connect()
@Radium
class ProjectWidget extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <h2 style={style.heading}>Project</h2>
        <div style={style.list}>

        </div>
      </div>
    )
  }
}

export default ProjectWidget
