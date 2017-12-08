import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import AuthRequired from 'decorators/AuthRequired'
import Layout, { PERSONAL_MODE } from 'decorators/Layout'

import BillingWidget from './BillingWidget'
import ProjectWidget from './ProjectWidget'

@connect()
@Layout(PERSONAL_MODE)
@AuthRequired
@Radium
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <ProjectWidget />
        <BillingWidget />
      </div>
    )
  }
}

export default Dashboard
