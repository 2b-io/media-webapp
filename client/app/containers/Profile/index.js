import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { SystemLayout } from 'decorators/Layout'

import { LinkButton } from 'components/Button'

@connect()
@SystemLayout
@Radium
class Profile extends React.Component {
  render() {
    let { match, profile } = this.props

    return (
      <div>
        <h1>Profile {profile.username}</h1>
        <LinkButton link="/profile/me">My Profile</LinkButton>
      </div>
    )
  }
}

@connect()
@Radium
class ProfileDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { params } = this.props.match

    return (
      <div>Detail profile: {params.id}</div>
    )
  }
}

export default Profile
