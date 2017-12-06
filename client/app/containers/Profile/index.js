import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'


import AuthRequired from 'decorators/AuthRequired'
import conditionalRenderer from 'decorators/ConditionalRenderer'
import Layout, { SYSTEM_MODE } from 'decorators/Layout'

import { LinkButton } from 'components/Button'

const RenderWhenProfileAvailable = conditionalRenderer(
  props => {
    const { dispatch } = props
  },
  props => !!props.profile.username,
  state => ({ profile: state.profile })
)

@connect()
@Layout(SYSTEM_MODE)
@AuthRequired
@RenderWhenProfileAvailable
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
@RenderWhenProfileAvailable
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
