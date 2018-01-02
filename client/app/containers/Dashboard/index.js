import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import AuthRequired from 'decorators/AuthRequired'
import Layout, { SYSTEM_MODE } from 'decorators/Layout'

import BillingWidget from './BillingWidget'
import ProjectWidget from './ProjectWidget'

import style from './style'

@connect()
@Layout(SYSTEM_MODE)
@AuthRequired
@Radium
class Dashboard extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.widget}>
          <ProjectWidget />
        </div>
        <div style={style.widget}>
          <ProjectWidget />
        </div>
        <div style={style.widget}>
          <ProjectWidget />
        </div>
        <div style={style.widget}>
          <ProjectWidget />
        </div>
        <div style={style.widget}>
          <ProjectWidget />
        </div>
        <div style={style.widget}>
          <ProjectWidget />
        </div>
        <div style={style.widget}>
          <BillingWidget />
        </div>
      </div>
    )
  }
}

export default Dashboard
