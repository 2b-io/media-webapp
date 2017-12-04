import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

@connect()
@Radium
class Dashboard extends React.Component {
  render() {
    return (
      <h1>Dashboard</h1>
    )
  }
}

export default Dashboard
