import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import { redirect } from 'actions/location'
import { fetchProfile } from 'actions/profile'

import conditionalRenderer from 'decorators/ConditionalRenderer'
import AuthRequired from 'decorators/AuthRequired'

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
        <button onClick={this._redirectTo.bind(this, '/profile/me')}>My Profile</button>
        <Route path={`${match.path}/:id`} component={ProfileDetail} />
      </div>
    )
  }
  _redirectTo(pathname) {
    let { dispatch } = this.props

    dispatch(redirect(pathname))
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
