import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import AuthRequired from 'decorators/AuthRequired'
import Layout, { SYSTEM_MODE } from 'decorators/Layout'

import { LinkButton } from 'components/Button'
import { signIn, signOut } from 'actions/session'

import styles from './styles'

@connect()
@Layout(SYSTEM_MODE)
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
          <LinkButton link="/dashboard">Dashboard</LinkButton>
        </div>
      </div>
    )
  }

  _fakeSignIn() {
    const { dispatch } = this.props

    dispatch(signIn({
      email: 'contact@stuffs.cool'
    }))
  }

  _fakeSignOut() {
    const { dispatch } = this.props

    dispatch(signOut())
  }
}

export default HomePage
