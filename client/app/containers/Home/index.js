import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import AuthRequired from 'decorators/AuthRequired'

import styles from './styles'

import { LinkButton } from 'components/Button'

import { signInRequest, signOutRequest } from 'actions/session'

@connect()
@AuthRequired
@Radium
class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this._fakeSignIn = this._fakeSignIn.bind(this)
    this._fakeSignOut = this._fakeSignOut.bind(this)
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>HomePage</h1>
        <div>
          <LinkButton link="/sign-in">Sign In</LinkButton>
          <LinkButton link="/profile">Profile</LinkButton>
        </div>
        <div>
          <button onClick={this._fakeSignIn}>Fake SignIn</button>
          <button onClick={this._fakeSignOut}>Fake SignOut</button>
        </div>
      </div>
    )
  }

  _fakeSignIn() {
    const { dispatch } = this.props

    dispatch(signInRequest({
      email: 'contact@stuffs.cool'
    }))
  }

  _fakeSignOut() {
    const { dispatch } = this.props

    dispatch(signOutRequest())
  }
}

export default HomePage
