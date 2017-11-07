import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import styles from './styles'

import Preload from 'components/Preload'

import { getSession, redirect } from 'core/actions'

@connect()
@Preload({ session: () => getSession() }, state => ({ session: state.session.id ? state.session : null }))
@Radium
class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.redirect = this.redirect.bind(this)
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>HomePage</h1>
        <div>
          <button onClick={this.redirect.bind(this, '/sign-in')}>Sign In</button>
          <button onClick={this.redirect.bind(this, '/profile')}>Profile</button>
        </div>
      </div>
    )
  }

  redirect(pathname) {
    let { dispatch } = this.props

    dispatch(redirect(pathname))
  }
}

export default HomePage
