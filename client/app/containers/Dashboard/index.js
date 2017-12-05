import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import Layout, { ACCOUNT_MODE } from 'decorators/Layout'

@connect()
@Layout(ACCOUNT_MODE)
@Radium
class Dashboard extends React.Component {
  render() {
    return (
      <h1>Dashboard</h1>
    )
  }
}

export default Dashboard
