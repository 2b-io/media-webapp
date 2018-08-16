import Radium from 'radium'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { SystemLayout } from 'decorators/Layout'

import BillingWidget from './BillingWidget'
import ProjectWidget from './ProjectWidget'

import style from './style'

@SystemLayout
@Radium
class Dashboard extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <Helmet key="helmet">
          <title>Dashboard</title>
        </Helmet>
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
