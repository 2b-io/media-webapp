import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import { fetchProfile } from 'actions/profile'

import conditionalRenderer from 'decorators/ConditionalRenderer'
import AuthRequired from 'decorators/AuthRequired'

import LinkButton from 'components/decorated/LinkButton'

const RenderWhenProfileAvailable = conditionalRenderer(
  props => {
    const { dispatch } = props

    dispatch(fetchProfile('me'))
  },
  props => !!props.profile.username,
  state => ({ profile: state.profile })
)

@connect()
@AuthRequired
@RenderWhenProfileAvailable
@Radium
class Profile extends React.Component {
  render() {
    let { match, profile } = this.props;

    return (
      <div>
        <h1>Profile {profile.username}</h1>
        <LinkButton link="/profile/me">My Profile</LinkButton>
        <Route path={`${match.path}/:id`} component={ProfileDetail} />
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
