import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

@connect()
@Radium
class Profile extends React.Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    )
  }
}

export default Profile
